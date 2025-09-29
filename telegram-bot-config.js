// Telegram Bot Configuration for KFC Project
const config = {
  bot: {
    token: '8477608805:AAF6-UwbhdQTClns7RQqeBXMbiJ1zPWrJAA',
    logsGroupId: '-1002636314382',
    loggingGroupId: '-4664599553'
  },
  database: {
    dialect: "sqlite",
    storage: "./telegram-bot/database.sqlite",
    logging: false
  }
};

module.exports = config;

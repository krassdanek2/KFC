// Telegram Bot Configuration for KFC Project
const config = {
  bot: {
    token: '8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA',
    logsGroupId: '-4938154910',
    loggingGroupId: '-1002986354571'
  },
  database: {
    dialect: "sqlite",
    storage: "./telegram-bot/database.sqlite",
    logging: false
  }
};

module.exports = config;

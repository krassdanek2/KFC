# Railway Environment Variables for KFC Clone Telegram Bot

# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/kfc-clone
MONGODB_URL=mongodb://localhost:27017/kfc-clone
DATABASE_URL=mongodb://localhost:27017/kfc-clone

# Telegram Bot Configuration
BOT_TOKEN=8091715985:AAF4vygWjtydtkzvjTN8TwyvethE46vptQA
LOGS_GROUP_ID=-4938154910
LOGGING_GROUP_ID=-4664599553

# Environment
NODE_ENV=production
RAILWAY_ENVIRONMENT=true

# Instructions for Railway:
# 1. Go to your Railway project dashboard
# 2. Navigate to Variables tab
# 3. Add these environment variables:
#    - MONGO_URL: Your MongoDB connection string from Railway MongoDB service
#    - BOT_TOKEN: Your Telegram bot token
#    - LOGS_GROUP_ID: Your Telegram group ID for logs
#    - LOGGING_GROUP_ID: Your Telegram group ID for logging
#    - NODE_ENV: production
#    - RAILWAY_ENVIRONMENT: true
#
# Note: Replace the MongoDB URL with your actual Railway MongoDB connection string
# The bot will automatically detect Railway environment and use MongoDB instead of SQLite

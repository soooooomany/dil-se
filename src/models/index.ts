import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

// Enums
export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export const Category = {
  BREAD: 'BREAD',
  CAKE: 'CAKE',
  PASTRY: 'PASTRY',
  COOKIE: 'COOKIE',
  BEVERAGE: 'BEVERAGE'
};

export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

// User Model
export class User extends Model {}
User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: DataTypes.STRING,
  password: DataTypes.STRING,
  emailVerified: DataTypes.DATE,
  role: {
    type: DataTypes.ENUM,
    values: Object.values(Role),
    defaultValue: Role.USER
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

// Product Model
export class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  imageUrl: {
    type: DataTypes.STRING,
    field: 'image_url'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM,
    values: Object.values(Category),
    defaultValue: Category.BREAD
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lowStockThreshold: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
});

// Cart Model
export class Cart extends Model {}
Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carts',
  timestamps: true
});

// Order Model
export class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(OrderStatus),
    defaultValue: OrderStatus.PENDING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: true
});

// Item Model
export class Item extends Model {}
Item.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cartId: DataTypes.UUID,
  orderId: DataTypes.UUID,
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productImage: DataTypes.STRING,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'items',
  timestamps: true
});

// Define relationships
User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Cart.hasMany(Item);
Item.belongsTo(Cart);

Order.hasMany(Item);
Item.belongsTo(Order);

Product.hasMany(Item);
Item.belongsTo(Product);

export const models = {
  User,
  Product,
  Cart,
  Order,
  Item
};
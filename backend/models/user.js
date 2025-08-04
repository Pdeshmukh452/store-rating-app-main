const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(60), allowNull: false, validate: { len: [20, 60] }},
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true }},
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: true },
  role: { type: DataTypes.ENUM('admin', 'user', 'storeOwner'), allowNull: false, defaultValue: 'user' },
});
module.exports = User;

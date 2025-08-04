const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
  address: { type: DataTypes.STRING, allowNull: false },
});
module.exports = Store;

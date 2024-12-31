const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client=require('./client')
const Sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    voucherDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false, references: {
        model: Client,
        key: 'id'
      }
    },
    oppositeAccountName: {
      type: DataTypes.STRING,
      defaultValue:'Sales'
    },
    totalInvoiceAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    }
  });
  Client.hasMany(Sales, { foreignKey: 'clientId', as: 'sales' });
      Sales.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
  
  module.exports = Sales;
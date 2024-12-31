const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client=require('./client')
const Purchase = sequelize.define('Purchase', {
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
      defaultValue:'Purchase'
    },
    totalInvoiceAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    }
  });
  Client.hasMany(Purchase, { foreignKey: 'clientId', as: 'purchases' });
      Purchase.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
  
  module.exports = Purchase;
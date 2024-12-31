const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Purchase = require('./purchase');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    purchaseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Purchase,
        key: 'id'
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grossWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    netWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stoneWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  
  Purchase.hasMany(PurchaseOrder, { foreignKey: 'purchaseId' });
  PurchaseOrder.belongsTo(Purchase, { foreignKey: 'purchaseId' });
  
  module.exports = PurchaseOrder;
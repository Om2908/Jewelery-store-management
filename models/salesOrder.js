const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Sales = require('./sales');

const SalesOrder = sequelize.define('SalesOrder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    salesId: {
      type: DataTypes.INTEGER,
      references: {
        model: Sales,
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
  
  Sales.hasMany(SalesOrder, { foreignKey: 'salesId' });
  SalesOrder.belongsTo(Sales, { foreignKey: 'salesId' });
  
  module.exports = SalesOrder;
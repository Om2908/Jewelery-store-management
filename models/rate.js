const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RateMaster = sequelize.define('RateMaster', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}, {
  timestamps: true, 
});

module.exports = RateMaster;

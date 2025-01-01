const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ledger = sequelize.define('Ledger', {
    name: DataTypes.STRING,
    firmName: DataTypes.STRING,
    email:DataTypes.STRING,
    gstNumber: DataTypes.STRING,
    panNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    pincode: DataTypes.STRING,
    image: DataTypes.STRING,
}, { timestamps: true });

module.exports = Ledger;
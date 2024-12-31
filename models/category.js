const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    material: {
        type: DataTypes.ENUM('Gold', 'Silver'),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},
 {
    timestamps: true
});
module.exports = Category;
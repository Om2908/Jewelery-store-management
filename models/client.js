const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ledger = require('./ledger');


const Client = sequelize.define('Client', {
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    firmName: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    gstNumber: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/i } },
    panNumber: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ } },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[0-9]{10}$/ } },
    address: { type: DataTypes.STRING, allowNull: false },
    pincode: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[0-9]{6}$/ } },
    image: { type: DataTypes.STRING },
}, { timestamps: true });


Client.afterUpdate(async (client, options) => {
    await Ledger.update(
        {
            name: client.name,
            firmName: client.firmName,
            email:client.email,
            gstNumber: client.gstNumber,
            panNumber: client.panNumber,
            phoneNumber: client.phoneNumber,
            address: client.address,
            pincode: client.pincode,
            image: client.image,
        },
        { where: { name: client.name } }
    );
});

Client.afterDestroy(async (client, options) => {
    await Ledger.destroy({ where: { name: client.name } });
});



module.exports = Client;
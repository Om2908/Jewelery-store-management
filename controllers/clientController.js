const Client = require('../models/client');
const Ledger = require('../models/ledger');

const createClient = async (req, res) => {
    try {
        const { name, firmName,email, gstNumber, panNumber, phoneNumber, address, pincode } = req.body;
        const image = req.file ? req.file.path : null;

        const client = await Client.create({
            name,
            firmName,
            email,
            gstNumber,
            panNumber,
            phoneNumber,
            address,
            pincode,
            image,
        });

        await Ledger.create({
            name: client.name,
            firmName: client.firmName,
            email:client.email,
            gstNumber: client.gstNumber,
            panNumber: client.panNumber,
            phoneNumber: client.phoneNumber,
            address: client.address,
            pincode: client.pincode,
            image: client.image,
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        
        const { name, firmName,email, gstNumber, panNumber, phoneNumber, address, pincode } = req.body;
        console.log(req.body);
        const image = req.file ? req.file.path : null;

        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.update({ name, firmName,email, gstNumber, panNumber, phoneNumber, address, pincode, image });
        console.log(client);
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.destroy();
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createClient, getAllClients,getClientById,updateClient,deleteClient,};
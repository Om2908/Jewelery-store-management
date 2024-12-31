const express = require('express');
const { createClient, getAllClients, getClientById, updateClient, deleteClient } = require('../controllers/clientController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('image'), createClient);
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.put('/:id', upload.single('image'), updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
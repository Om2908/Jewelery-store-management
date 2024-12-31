const express = require('express');
const { createSales, listSales, viewSales } = require('../controllers/salesController.js');

const router = express.Router();

router.post('/', createSales);
router.get('/', listSales);
router.get('/:id', viewSales);
module.exports = router;
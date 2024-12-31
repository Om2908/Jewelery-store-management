const express = require('express');
const { createPurchase, listPurchases, viewPurchase } = require('../controllers/purchaseController.js');

const router = express.Router();

router.post('/', createPurchase);
router.get('/', listPurchases);
router.get('/:id', viewPurchase);
module.exports = router;
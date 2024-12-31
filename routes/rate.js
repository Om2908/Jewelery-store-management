const express = require('express');
const router = express.Router();
const { upsertRateMaster, getRateMaster, deleteRateMaster } = require('../controllers/rateController');

router.post('/', upsertRateMaster);  
router.get('/', getRateMaster);  
router.delete('/', deleteRateMaster); 

module.exports = router;

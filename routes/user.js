// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const auth=require('../middleware/auth');
const router = express.Router();

router.post('/create',auth.authenticate,auth.authorize('super_admin'), userController.createUser);
router.get('/',auth.authenticate,userController.getUserById);
router.put('/:id',auth.authenticate,auth.authorize('super_admin'),userController.updateUser);
router.delete('/:id',auth.authenticate,auth.authorize('super_admin'),userController.deleteUser);


module.exports = router;



const express = require('express');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const {authenticate,authorize} = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate,authorize("super_admin"), createCategory);
router.get('/',  authenticate,authorize("super_admin"), getAllCategories);
router.get('/:id', authenticate,authorize("super_admin"), getCategoryById);
router.put('/:id', authenticate,authorize("super_admin"), updateCategory);
router.delete('/:id', authenticate,authorize("super_admin"), deleteCategory);

module.exports = router;



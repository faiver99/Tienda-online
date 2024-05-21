const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticateUser, isAdmin } = require('../middlewares/auth');
const { validate, productValidationRules } = require('../middlewares/validation');
const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Crear un nuevo producto (solo para administradores)
router.post('/', authenticateUser, isAdmin, productValidationRules(), validate, createProduct);

// Actualizar un producto (solo para administradores)
router.put('/:id', authenticateUser, isAdmin, productValidationRules(), validate, updateProduct);

// Eliminar un producto (solo para administradores)
router.delete('/:id', authenticateUser, isAdmin, deleteProduct);

module.exports = router;

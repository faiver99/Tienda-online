const express = require('express');
const { authenticateUser } = require('../middlewares/auth');
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const router = express.Router();

// Asegurar que el usuario esté autenticado para todas las rutas del carrito
router.use(authenticateUser);

// Obtener el carrito del usuario
router.get('/', getCart);

// Añadir un producto al carrito
router.post('/add', addToCart);

// Eliminar un producto del carrito
router.post('/remove', removeFromCart);

// Actualizar la cantidad de un producto en el carrito
router.post('/update', updateCartItem);

module.exports = router;

const express = require('express');
const { authenticateUser, isAdmin } = require('../middlewares/auth');
const { createOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

// Asegurar que el usuario esté autenticado para todas las rutas de pedidos
router.use(authenticateUser);

// Crear un nuevo pedido
router.post('/', createOrder);

// Obtener un pedido por ID
router.get('/:id', getOrderById);

// Obtener todos los pedidos (solo para administradores)
router.get('/', isAdmin, getAllOrders);

// Actualizar el estado de un pedido (solo para administradores)
router.put('/:id', isAdmin, updateOrderStatus);

module.exports = router;

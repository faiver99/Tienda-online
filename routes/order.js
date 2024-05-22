const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Asegúrate de que este archivo y funciones existan

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
// Agrega más rutas según sea necesario

module.exports = router;

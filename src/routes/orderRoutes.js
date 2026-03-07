const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Rotas da API
router.post('/', orderController.createOrder);
router.get('/list', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
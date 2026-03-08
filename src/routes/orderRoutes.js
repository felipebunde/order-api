const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const router = express.Router(); 

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemRequest:
 *       type: object
 *       required:
 *         - idItem
 *         - quantidadeItem
 *         - valorItem
 *       properties:
 *         idItem:
 *           type: string
 *           example: "2434"
 *         quantidadeItem:
 *           type: number
 *           example: 1
 *         valorItem:
 *           type: number
 *           example: 1000
 *     PedidoRequest:
 *       type: object
 *       required:
 *         - numeroPedido
 *         - valorTotal
 *         - dataCriacao
 *         - items
 *       properties:
 *         numeroPedido:
 *           type: string
 *           example: "v10089015vdb-01"
 *         valorTotal:
 *           type: number
 *           example: 10000
 *         dataCriacao:
 *           type: string
 *           example: "2023-07-19T12:24:11.5299601+00:00"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemRequest'
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// ROTA 1: POST /order (protegida)
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoRequest'
 *     responses:
 *       201:
 *         description: Pedido criado
 *       401:
 *         description: Não autorizado - token não fornecido
 *       403:
 *         description: Token inválido
 *       409:
 *         description: Pedido já existe
 */
router.post('/', auth, orderController.createOrder);

// ROTA 2: GET /order/list (pública)
/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/list', orderController.getAllOrders);

// ROTA 3: GET /order/:id (pública)
/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', orderController.getOrderById);

// ROTA 4: PUT /order/:id (protegida)
/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Atualizar um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoRequest'
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */
router.put('/:id', auth, orderController.updateOrder);

// ROTA 5: DELETE /order/:id (protegida)
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Deletar um pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido deletado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
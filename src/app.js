const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware para parsing do JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log das requisições (útil para debug)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/order', orderRoutes);

// Rota raiz para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    message: 'API de Pedidos - Versão 1.0',
    endpoints: {
      criarPedido: 'POST /order',
      listarPedidos: 'GET /order/list',
      obterPedido: 'GET /order/:id',
      atualizarPedido: 'PUT /order/:id',
      deletarPedido: 'DELETE /order/:id'
    }
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Não encontrado',
    message: 'Rota não encontrada'
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
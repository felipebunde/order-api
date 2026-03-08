const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// IMPORTS 
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes'); 
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log das requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configurar Swagger
setupSwagger(app);

// Rotas 
app.use('/auth', authRoutes);     
app.use('/order', orderRoutes);   

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    message: 'API de Pedidos - Versão 1.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login'
      },
      pedidos: {
        criarPedido: 'POST /order',
        listarPedidos: 'GET /order/list',
        obterPedido: 'GET /order/:id',
        atualizarPedido: 'PUT /order/:id',
        deletarPedido: 'DELETE /order/:id'
      }
    },
    docs: 'http://localhost:3000/api-docs'
  });
});

// rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Não encontrado',
    message: 'Rota não encontrada'
  });
});

//  tratamento de erros 
app.use(errorHandler);

module.exports = app;
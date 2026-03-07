# API de Gerenciamento de Pedidos

## 📋 Sobre o Projeto
API RESTful desenvolvida para desafio técnico, permitindo gerenciar pedidos com transformação automática de dados.

## 🚀 Tecnologias
- Node.js
- Express
- MongoDB Atlas
- Mongoose

## 📌 Endpoints

### Criar Pedido
`POST /order`
- Body: JSON com numeroPedido, valorTotal, dataCriacao, items
- Resposta: 201 Created com dados transformados

### Listar Pedidos
`GET /order/list`
- Resposta: 200 OK com array de pedidos

### Buscar Pedido
`GET /order/:id`
- Resposta: 200 OK com dados do pedido

### Atualizar Pedido
`PUT /order/:id`
- Body: mesmo formato da criação
- Resposta: 200 OK com dados atualizados

### Deletar Pedido
`DELETE /order/:id`
- Resposta: 200 OK com mensagem de confirmação

## 📦 Exemplos de Requisições

### Criar Pedido
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
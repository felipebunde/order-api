const mongoose = require('mongoose');

// Schema para os itens do pedido
const itemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, 'O ID do produto é obrigatório']
  },
  quantity: {
    type: Number,
    required: [true, 'A quantidade do item é obrigatória'],
    min: [1, 'A quantidade deve ser maior que 0']
  },
  price: {
    type: Number,
    required: [true, 'O preço do item é obrigatório'],
    min: [0, 'O preço não pode ser negativo']
  }
});

// Schema para o pedido
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'O número do pedido é obrigatório'],
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    required: [true, 'O valor total é obrigatório'],
    min: [0, 'O valor total não pode ser negativo']
  },
  creationDate: {
    type: Date,
    required: [true, 'A data de criação é obrigatória']
  },
  items: [itemSchema]
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Order', orderSchema);
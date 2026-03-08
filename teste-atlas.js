// teste-atlas.js
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Tentando conectar ao MongoDB Atlas...');
console.log('URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ CONECTADO COM SUCESSO AO MONGODB ATLAS!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ ERRO AO CONECTAR:', err.message);
    process.exit(1);
  });
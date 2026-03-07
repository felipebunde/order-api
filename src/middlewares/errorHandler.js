// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      error: 'Erro de validação',
      messages: errors
    });
  }

  // Erro de chave duplicada
  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Conflito',
      message: 'Já existe um registro com este valor único'
    });
  }

  // Erro genérico
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado'
  });
};

module.exports = errorHandler;
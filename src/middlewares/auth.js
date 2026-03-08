const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({
      error: 'Não autorizado',
      message: 'Token não fornecido'
    });
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return res.status(401).json({
      error: 'Não autorizado',
      message: 'Formato do token inválido'
    });
  }

  const [scheme, token] = parts;
  
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      error: 'Não autorizado',
      message: 'Token mal formatado'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Não autorizado',
      message: 'Token inválido ou expirado'
    });
  }
};
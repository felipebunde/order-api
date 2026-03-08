const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Verifica se usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }
    
    // Cria usuário
    const user = new User({ username, password });
    await user.save();
    
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Busca usuário
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Verifica senha
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Gera token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ 
      message: 'Login realizado com sucesso',
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
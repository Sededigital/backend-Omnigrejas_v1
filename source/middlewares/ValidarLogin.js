const validarLogin = (req, res, next) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos obrigatórios.' });
    }
  
    next();
  };
  
  module.exports = validarLogin;
  
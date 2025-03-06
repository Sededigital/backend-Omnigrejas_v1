const validarDadosUsuario = (req, res, next) => {
    const { nome, email, senha } = req.body;
  
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
    }
  
    if (!email.includes('@')) {
      return res.status(400).json({ mensagem: 'E-mail inválido.!' });
    }
  
    if (senha.length < 6) {
      return res.status(400).json({ mensagem: 'A senha deve ter pelo menos 6 caracteres.' });
    }
  
    next(); 
  };
  
  module.exports = validarDadosUsuario;
  
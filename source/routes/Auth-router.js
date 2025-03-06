const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Config/firebase');

const router = express.Router();
const USERS_COLLECTION = 'usuarios';
const SECRET_KEY = process.env.JWT_SECRET || "minhaChaveSecreta"; // Substitua por uma chave segura

// Login do usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }

    const usuario = snapshot.docs[0].data();
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }

    // Gerar Token JWT
    const token = jwt.sign({ id: snapshot.docs[0].id, email: usuario.email }, SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ mensagem: 'Login realizado com sucesso!', token });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro: err.message });
  }
});

module.exports = router;

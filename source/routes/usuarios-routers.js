const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../Config/firebase'); 

const router = express.Router();
const USERS_COLLECTION = 'usuarios'; 

// Rota de teste
router.get('/teste', (req, res) => {
  res.status(200).json({ mensagem: 'Rota GET /usuarios/teste funcionando!' });
});

// Buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection(USERS_COLLECTION).get();
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: err.message });
  }
});

// Criar um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    const snapshot = await db.collection(USERS_COLLECTION).where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(409).json({ mensagem: 'E-mail já está em uso.' });
    }

    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o novo usuário
    const novoUsuario = {
      nome,
      email,
      senha: senhaHash,
      criadoEm: new Date()
    };

    const userRef = await db.collection(USERS_COLLECTION).add(novoUsuario);

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: userRef.id, usuario: novoUsuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário.', erro: err.message });
  }
});

module.exports = router;

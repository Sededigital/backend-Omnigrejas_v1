"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { realtimeDB, firestoreDB } = require("./Config/firebase"); // ✅ Importação corrigida

const app = express();

// 📌 Middlewares
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("🚀 API OMINIGREJAS rodando!");
  res.send("Version: 1.0.0");
});

app.get("/usuarios", async (req, res) => {
  try {
    const snapshot = await firestoreDB.collection("usuarios").get();
    const usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários", details: error.message });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) return res.status(400).json({ error: "Nome e Email são obrigatórios!" });

    const docRef = await firestoreDB.collection("usuarios").add({ nome, email });
    res.json({ id: docRef.id, nome, email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
});


app.put("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const { id } = req.params;

    const docRef = firestoreDB.collection("usuarios").doc(id);
    await docRef.update({ nome, email });

    res.json({ id, nome, email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await firestoreDB.collection("usuarios").doc(id).delete();
    res.json({ message: `Usuário ${id} removido com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
});

app.get("/realtime/dados", async (req, res) => {
  try {
    realtimeDB.ref("teste").once("value", (snapshot) => {
      res.json(snapshot.val());
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do Realtime Database", details: error.message });
  }
});

app.post("/realtime/dados", async (req, res) => {
  try {
    const { chave, valor } = req.body;
    if (!chave || !valor) return res.status(400).json({ error: "Chave e Valor são obrigatórios!" });

    await realtimeDB.ref(chave).set(valor);
    res.json({ message: `Dado salvo em ${chave}` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar dados", details: error.message });
  }
});

module.exports = app;

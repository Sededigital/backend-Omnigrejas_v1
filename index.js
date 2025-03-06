"use strict";

const app = require("./source/app"); 
const debug = require("debug")("nodestr:server");
const http = require("http");
const { realtimeDB, firestoreDB } = require("./source/Config/firebase"); 

// Normalização da porta
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

// Inicia o servidor
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

async function testFirebaseConnection() {
  try {
    if (!realtimeDB || !firestoreDB) {
      throw new Error("Firebase não foi inicializado corretamente! Verifique sua configuração.");
    }

    await firestoreDB.collection("test").get();
    console.log("✅ Firebase Firestore conectado com sucesso!");

    await realtimeDB.ref("test").set({ mensagem: "Conexão bem-sucedida!" });
    console.log("✅ Firebase Realtime Database conectado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao Firebase:", err);
  }
}

// Executa o teste de conexão com Firebase
testFirebaseConnection();

// Função para normalizar a porta
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

// Função para tratar erros do servidor
function onError(error) {
  console.error("❌ Erro no servidor:", error);

  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requer privilégios elevados`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} já está em uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Função para logar a inicialização do servidor
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`🚀 API rodando na porta ${port}`);
}

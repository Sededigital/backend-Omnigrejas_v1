const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS); 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://omnigrejasapp-default-rtdb.firebaseio.com"
  });
}

const realtimeDB = admin.database();
console.log("🔥 Firebase Realtime Database conectado com sucesso!");

const firestoreDB = admin.firestore();
console.log("🔥 Firestore conectado com sucesso!");

realtimeDB.ref("teste").set({ mensagem: "Conexão bem-sucedida!" })
  .then(() => console.log("✅ Dados de teste enviados!"))
  .catch((error) => console.error("❌ Erro ao enviar dados:", error));

module.exports = { realtimeDB, firestoreDB };
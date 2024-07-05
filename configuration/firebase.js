const admin = require("firebase-admin");
const dotenv = require("dotenv");
// const serviceAccount = require("../key.json");

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);

module.exports = { bucket };

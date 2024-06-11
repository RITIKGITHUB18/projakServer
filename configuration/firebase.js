// const dotenv = require("dotenv");
// const assert = require("assert");
// require("dotenv").config();

// const {
//   PORT,
//   HOST,
//   HOST_URL,
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   FIRESTORE_DB_URL,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } = process.env;

// assert(PORT, "PORT is required");
// assert(HOST, "HOST is required");

// module.exports = {
//   port: PORT,
//   host: HOST,
//   url: HOST_URL,
//   firebaseConfig: {
//     apiKey: API_KEY,
//     authDomain: AUTH_DOMAIN,
//     projectId: PROJECT_ID,
//     storageBucket: STORAGE_BUCKET,
//     messagingSenderId: MESSAGING_SENDER_ID,
//     appId: APP_ID,
//     measurementId: MEASUREMENT_ID,
//   },
// };

const admin = require("firebase-admin");
const dotenv = require("dotenv");
const serviceAccount = require("../key.json");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);

module.exports = { bucket };

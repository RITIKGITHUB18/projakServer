// config/mailchimp.js
require("dotenv").config();

module.exports = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
  listId: process.env.MAILCHIMP_LIST_ID,
};

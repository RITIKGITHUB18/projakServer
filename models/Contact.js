const mongoose = require("mongoose");
const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactUsSchema);

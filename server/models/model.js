const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  acc_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: "NA",
  },
  acc_balance: {
    type: Number,
    required: true,
  },
});


module.exports = User = mongoose.model("User", userSchema);


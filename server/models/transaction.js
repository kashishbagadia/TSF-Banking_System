const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    Date: {
      type: Date,
      default: Date.now,
    },
    amount:{
      type: Number,
      required: true,
    },
    From:{      
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    To:{
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });
  module.exports = Transaction = mongoose.model("Transaction", transactionSchema);
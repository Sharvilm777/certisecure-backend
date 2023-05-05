const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  role: { type: String },
  name: { type: String, require: true },
  id: { type: String, require: true },
  status: { type: String },
  txhash: { type: String },
  verifiedAt: { type: Date, default: Date.now },
});
const transactionModel = new model("transaction", transactionSchema);
module.exports = transactionModel;

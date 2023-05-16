const mongoose = require("mongoose");
const { Schema } = mongoose;

const certficateSchema = new Schema({
  c_hash: { type: String, require: true },
  t_hash: { type: String, require: true },
  addedAt: { type: Date, default: Date.now },
});
const certficateModel = mongoose.model("certficate", certficateSchema);
module.exports = certficateModel;

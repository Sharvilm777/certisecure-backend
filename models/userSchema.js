const mongoose = require("mongoose");
// Destructuring the Schema method from mongoose
const { Schema } = mongoose;

// Creating a new userSchema using mongoose Schema
// Here we should define what are we going to store and what all types we are using
const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});
// Now we are creating a model using userSchema what we built
const users = mongoose.model("users", userSchema);
module.exports = users;

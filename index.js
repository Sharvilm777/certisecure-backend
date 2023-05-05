const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./DBConnect");

connectDB();

const PORT = process.env.PORT || 3000;

app.use(cors());
// Using express.json() middleware - All clear explanation written in explanation.txt file
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    msg: "App started succesfully and serving for route /",
  });
});
app.use("/auth", require("./routes/auth"));
app.use("/transac", require("./routes/transaction"));
// app.listen() method will make and setup the express app in given PORT
app.listen(PORT, () => {
  console.log(`App is listening at port:${PORT}`);
});

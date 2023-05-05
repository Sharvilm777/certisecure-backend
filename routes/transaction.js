const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const transaction = require("../models/transaction");
// Route 1 :GET -  /getTransac  Get All transaction that are stored in db
router.get("/getTransac", isAdmin, (req, res) => {
  res.send("Admin authorization complete");
});

// Route 2 :POST - /addTransac Add the transaction after successfull verification of certificate
router.post("/addTransac", async (req, res) => {
  let newTransac = await transaction.create({
    role: req.body.role,
    name: req.body.name,
    id: req.body.id,
    status: req.body.status,
    txhash: req.body.hash,
  });
  res.json({ newTransac });
});

module.exports = router;

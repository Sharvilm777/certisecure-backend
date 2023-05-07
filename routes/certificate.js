const express = require("express");
const router = express.Router();
const CertificateModel = require("../models/certificate");
const isAdmin = require("../middleware/isAdmin");

// Route 1 : /addCertificate : This Route will add the certificate hash and time to db
// api: certificate/addCertificate;
router.post("/addCertificate", isAdmin, async (req, res) => {
  let addedCertificate = await CertificateModel.create({
    c_hash: req.body.hash,
  });
  res
    .status(200)
    .json({ msg: "Certifcate Added Successfully", addedCertificate });
});

// Route 2 :/getCertificates : This route will get all the certificate hashes and time to admin
router.get("/getCertificates", isAdmin, async (req, res) => {
  let certificates = await CertificateModel.find({});
  res.status(200).json({ certificates });
});
module.exports = router;

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");

// Route 1: auth/signup -- SIGNUP -- This will recive the user data and save it in database

router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 8 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      res.status(406).json({ errors: errs.array() });
      return;
    }

    let user = await users.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({ msg: "Sorry user with Email Already exist,You can Login" });
      return;
    }
    let salt = await bcrypt.genSalt(10);

    let securePassword = await bcrypt.hash(req.body.password, salt);
    user = await users.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });
    res.status(201).json({ msg: "User Created Successfully", user });
    return;
  }
);

// Route 2 : /auth/login -- LOGIN -- Collects the Credentials from the user and validate from the database

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(406).json({ errors: errors.array() });
      return;
    }
    let user = await users.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        msg: "User with Email doesnt exists...Please Create your Account ",
      });
      return;
    }
    let role;
    let jwtData = {};
    if (user.email === "imadmin@gmail.com") {
      jwtData = {
        user: {
          id: user.id,
          role: "admin",
        },
      };
      role = "admin";
    } else {
      jwtData = {
        user: {
          id: user.id,
          role: "user",
        },
      };
      role = "user";
    }

    let authToken = jwt.sign(jwtData, process.env.JWTSIGN, {
      expiresIn: "3h",
    });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return res
        .status(200)
        .json({ msg: "User Signed in successfully", authToken, role });
    } else {
      return res.status(400).json({ msg: "Entered password is wrong" });
    }
  }
);
module.exports = router;

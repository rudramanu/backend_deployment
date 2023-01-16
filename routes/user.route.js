const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

userRouter.post("/register", (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, encrypt_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: encrypt_password,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering", error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "coder");
          res.send({ message: "Logged in successfully", token: token });
        } else {
          res.send("Wrong credentials");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = {
  userRouter,
};

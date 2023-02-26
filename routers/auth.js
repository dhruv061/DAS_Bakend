const express = require("express");
const User = require("../model/user");

const authorRouter = express.Router();

//for signin
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

//SIGN-UP API
authorRouter.post("/api/signup", async (req, res) => {
  try {
    //-->get the data from the client
    const { name, email, enrollmentno, branchsem, password } = req.body;

    //check if user exits or not
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    let user = new User({
      name,
      email,
      enrollmentno,
      branchsem,
      password,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API
authorRouter.post("/api/signin", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Token Verified API
authorRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get user Data API
//auth is middle ware
authorRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({...user._doc, token: req.token });
});

module.exports = authorRouter;

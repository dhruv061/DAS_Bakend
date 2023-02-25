//
const express = require("express");
const User = require("../model/user");

const authorRouter = express.Router();

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
    res.send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  //--> post that data in db
  //-->return that data to the user
});

module.exports = authorRouter;

const express = require("express");

//for getting user schema
const { User_6IT, User_6CE, User_6ME } = require("../model/user");

const authorRouter = express.Router();
//for paswword compare || store hash password
const bcryptjs = require("bcryptjs");

//for signin
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

//for getting attendace schema
const {
  PLSD6IT,
  IPDC6IT,
  PLSD6CE,
  IPDC6CE,
  PLSD6ME,
  IPDC6ME,
} = require("../model/attendance");

//**************************************************************************************/

//SIGN-UP API --> 6IT
authorRouter.post("/api/signup/6IT", async (req, res) => {
  try {
    //-->get the data from the client
    const { name, email, enrollmentno, branchsem, password } = req.body;

    //check if user exits or not
    const existinguser = await User_6IT.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let user = new User_6IT({
      name,
      email,
      enrollmentno,
      branchsem,
      password: hashPassword,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//SIGN-UP API --> 6CE
authorRouter.post("/api/signup/6CE", async (req, res) => {
  try {
    //-->get the data from the client
    const { name, email, enrollmentno, branchsem, password } = req.body;

    //check if user exits or not
    const existinguser = await User_6CE.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let user = new User_6CE({
      name,
      email,
      enrollmentno,
      branchsem,
      password: hashPassword,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//SIGN-UP API --> 6ME
authorRouter.post("/api/signup/6ME", async (req, res) => {
  try {
    //-->get the data from the client
    const { name, email, enrollmentno, branchsem, password } = req.body;

    //check if user exits or not
    const existinguser = await User_6ME.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let user = new User_6ME({
      name,
      email,
      enrollmentno,
      branchsem,
      password: hashPassword,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API --> 6IT
authorRouter.post("/api/signin/6IT", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await User_6IT.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //check password match
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ msg: "Password is Invalid" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API --> 6CE
authorRouter.post("/api/signin/6CE", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await User_6CE.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //check password match
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ msg: "Password is Invalid" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API --> 6ME
authorRouter.post("/api/signin/6ME", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await User_6ME.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    //check password match
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({ msg: "Password is Invalid" });
    }

    //JWT token for signin
    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//**********************************************************************************************/

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
  res.json({ ...user._doc, token: req.token });
});

//*********************************************************************8888*/
//markAttendanceApi's
//PLSD
authorRouter.post("/api/markAttendance/PLSD", async (req, res) => {
  try {
    const { enrollmentno, Attendance, Time, Date, Sembranch } = req.body;

    //IT
    if (Sembranch == "6IT") {
      let PlsdAttendace = new PLSD6IT({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }

    //CE
    if (Sembranch == "6CE") {
      let PlsdAttendace = new PLSD6CE({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }

    //ME
    if (Sembranch == "6ME") {
      let PlsdAttendace = new PLSD6ME({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//IPDC
authorRouter.post("/api/markAttendance/IPDC", async (req, res) => {
  try {
    const { enrollmentno, Attendance, Time, Date, Sembranch } = req.body;

    //IT
    if (Sembranch == "6IT") {
      let PlsdAttendace = new IPDC6IT({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }

    //CE
    if (Sembranch == "6CE") {
      let PlsdAttendace = new IPDC6CE({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }

    //ME
    if (Sembranch == "6ME") {
      let PlsdAttendace = new IPDC6ME({
        enrollmentno,
        Attendance,
        Time,
        Date,
        Sembranch,
      });

      PlsdAttendace = await PlsdAttendace.save();
      res.status(201).send(PlsdAttendace);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authorRouter;

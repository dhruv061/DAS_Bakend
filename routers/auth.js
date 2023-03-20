const express = require("express");

//for getting user schema
const { User_6IT, User_6CE, User_6ME, admin } = require("../model/user");

const authorRouter = express.Router();
//for paswword compare || store hash password
const bcryptjs = require("bcryptjs");

//for signin
const jwt = require("jsonwebtoken");
// const { auth1, auth2, auth3 } = require("../middlewares/auth");
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

//SIGN-UP API
authorRouter.post("/api/signup", async (req, res) => {
  try {
    //-->get the data from the client
    const { name, email, enrollmentno, branchsem, password } = req.body;

    //6CE
    if (branchsem == "6CE") {
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
    }

    //6IT
    else if (branchsem == "6IT") {
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
    }

    //6ME
    else {
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
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Sign-In API
authorRouter.post("/api/signin", async (req, res) => {
  try {
    //get data from client
    const { email, password, branchsem } = req.body;

    if (branchsem == "6IT") {
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
    } else if (branchsem == "6CE") {
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
    } else {
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
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Admin SIGN-UP API
authorRouter.post("/api/adminSignup", async (req, res) => {
  try {
    //-->get the data from the client
    const { EnableAttendace, email, password } = req.body;

    //check if user exits or not
    const existinguser = await admin.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "User with same email alredy exits!" });
    }

    //here 8 is solt --> 8 charcter password
    const hashPassword = await bcryptjs.hash(password, 8);

    let user = new admin({
      EnableAttendace,
      email,
      password: hashPassword,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//admin sinIn API
authorRouter.post("/api/adminSignIn", async (req, res) => {
  try {
    //get data from client
    const { email, password } = req.body;

    //check if user exits or not
    const user = await admin.findOne({ email });
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

    res.json({ ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Enable Attendace API
authorRouter.patch("/api/enableAttendace/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const update = await admin.findByIdAndUpdate(_id, req.body);

    res.status(201).send(update);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//**********************************************************************************************/

//Token Verified API
//6CE
authorRouter.post("/tokenIsValid/6CE", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await User_6CE.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//6IT
authorRouter.post("/tokenIsValid/6IT", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await User_6IT.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//6ME
authorRouter.post("/tokenIsValid/6IT", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {
      return res.json(false);
    }

    const user = await User_6ME.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//**********************************************************************************************/

//get user Data API
//auth is middle ware
//6CE
authorRouter.get("/api/getdata/6CE", auth, async (req, res) => {
  const user = await User_6CE.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//6IT
authorRouter.get("/api/getdata/6IT", auth, async (req, res) => {
  const user = await User_6IT.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//6ME
authorRouter.get("/api/getdata/6ME", auth, async (req, res) => {
  const user = await User_6ME.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//**********************************************************************/
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

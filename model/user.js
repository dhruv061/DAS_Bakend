const mongoose = require("mongoose");

//schema of students
const createSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true, //trim remove space in user input
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (val) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return val.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  enrollmentno: {
    required: true,
    type: String,
    trim: true,
  },
  branchsem: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
});

//admin schema
const adminSchems = mongoose.Schema({
  EnableAttendace: {
    default: "false",
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (val) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return val.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
});

//create Collection
const User_6IT = mongoose.model("6IT Students", createSchema, "6IT_Students");
const User_6CE = mongoose.model("6CE Students", createSchema, "6CE_Students");
const User_6ME = mongoose.model("6ME Students", createSchema, "6ME_Students");

//for admin collection
const admin = mongoose.model("Admin", adminSchems, "Admin");

module.exports = { User_6IT, User_6CE, User_6ME, admin };

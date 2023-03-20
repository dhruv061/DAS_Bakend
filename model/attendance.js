//basic schema of Attendance
const mongoose = require("mongoose");

//schema of students
const AttendaceSchema = mongoose.Schema({
  enrollmentno: {
    required: true,
    type: String,
    trim: true,
  },
  Attendance: {
    required: true,
    type: String,
    trim: true,
  },
  Time: {
    type: String,
    trim: true,
    required: true,
  },
  Date: {
    type: String,
    trim: true,
    required: true,
  },
  Sembranch: {
    type: String,
    trim: true,
    required: true,
  },
  lectureNo: {
    type: String,
    trim: true,
    required: true,
  },
});

//Define model for each subject

//PLASD & IPDC
const PLSD6IT = mongoose.model("6IT PLSD", AttendaceSchema, "6IT PLSD");
const IPDC6IT = mongoose.model("6IT IPDC", AttendaceSchema, "6IT IPDC");
const PLSD6CE = mongoose.model("6CE PLSD", AttendaceSchema, "6CE PLSD");
const IPDC6CE = mongoose.model("6CE IPDC", AttendaceSchema, "6CE IPDC");
const PLSD6ME = mongoose.model("6ME PLSD", AttendaceSchema, "6ME PLSD");
const IPDC6ME = mongoose.model("6ME IPDC", AttendaceSchema, "6ME IPDC");

module.exports = { PLSD6IT, IPDC6IT, PLSD6CE, IPDC6CE, PLSD6ME, IPDC6ME };

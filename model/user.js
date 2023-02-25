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
    type: Number,
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

//create Collection
const User = mongoose.model("Students", createSchema);
module.exports = User;

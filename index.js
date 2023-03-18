// const express = require("express");
// const mongoose = require("mongoose");
// const createSchema = require("../model/attendance");
// const cors = require("cors");
// const app = express();
// app.use(cors());

// //Database Url
// // const DB =
// //   "mongodb+srv://DAS:DAS123@cluster0.rnd3gqh.mongodb.net/?retryWrites=true&w=majority";

// const IT6_DB =
//   "mongodb+srv://DAS:DAS123@cluster0.rnd3gqh.mongodb.net/?retryWrites=true&w=majority/6IT";
// const CE6_DB =
//   "mongodb+srv://DAS:DAS123@cluster0.rnd3gqh.mongodb.net/?retryWrites=true&w=majority/6CE";

// //import file from the other file structure
// const authorRouter = require("./routers/auth");

// //if we use local then it's get 3000 otherwise they automatically
// const PORT = process.env.PORT || 3000;

// //middleware
// app.use(express.json());
// app.use(authorRouter);

// //Database connections
// mongoose.set("strictQuery", false);

// //create connection for different DB
// const IT6 = mongoose.createConnection(IT6_DB);
// const CE6 = mongoose.createConnection(CE6_DB);

// //define model
// const AWP_Model = IT6.model("AWP", createSchema);

// //listen port
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Connection make succefullay at ${PORT}`);
// });

//*****************************************************/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
//import file from the other file structure
const authorRouter = require("./routers/auth");

const DAS =
  "mongodb+srv://DAS:DAS123@cluster0.rnd3gqh.mongodb.net/DAS?retryWrites=true&w=majority";

//if we use local then it's get 3000 otherwise they automatically
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(authorRouter);

//Database connections
mongoose.set("strictQuery", false);
mongoose
  .connect(DAS)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

//listen port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connection make succefullay at ${PORT}`);
});

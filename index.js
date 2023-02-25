const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

//Database Url
const DB =
  "mongodb+srv://DAS:DAS123@cluster0.rnd3gqh.mongodb.net/?retryWrites=true&w=majority";

//import file from the other file structure
const authorRouter = require("./routers/auth");

//if we use local then it's get 3000 otherwise they automatically
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(authorRouter);

//Database connections
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
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

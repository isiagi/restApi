const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db");
  }
);

//middleware
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization, auth-token"
  );
  next();
});

//use Middleware

app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("Up and Running");
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`Server Up and runing ${Port}`);
});

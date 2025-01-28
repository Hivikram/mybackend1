const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { recipeModel, userModel } = require("./models.js");

const {
  createData,
  getData,
  getDataById,
  deleteDataById,
  signupController,
  signinController,
  signoutController,
} = require("./controlers.js");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const { mongourl } = process.env;
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/recipes", createData(recipeModel));
app.get("/recipes", getData(recipeModel));
app.get("/recipes/:id", getDataById(recipeModel));
app.delete("/recipes/:id", deleteDataById(recipeModel));

app.post("/signup", signupController(userModel));
app.post("/signin", signinController(userModel));
app.post("/signout", signoutController);
app.delete("/delAccount/:id", deleteDataById(userModel));
const port = process.env.PORT || 4000;
console.log(port);
app.listen(port, () => {
  console.log("localhost:4000");
});

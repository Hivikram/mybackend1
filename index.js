const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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
const router = express.Router();
const user = express.Router();
const userRouter = app.use("/userAcoutn", user);
const recipesRouter = app.use("/recipes", router);

const { mongourl } = process.env;
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

recipesRouter.post("/", createData(recipeModel));
recipesRouter.get("/", getData(recipeModel));
recipesRouter.get("/:id", getDataById(recipeModel));
recipesRouter.delete("/:id", deleteDataById(recipeModel));

app.post("/signup", signupController(userModel));
app.post("/signin", signinController(userModel));
app.post("/signout", signoutController);
app.delete("/delAccount/:id", deleteDataById(userModel));
app.listen(3000, () => {
  console.log("localhost:3000");
});

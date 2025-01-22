const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { recipeModel, userModel } = require("./models.js");

const {
  createData,
  getData,
  getDataById,
  deleteDataById,
  signinController,
} = require("./controlers.js");

const app = express();
dotenv.config();
app.use(express.json());

const router = express.Router();
const user = express.Router();
const userRouter = app.use("/user", user);
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

app.post("/recipes", createData(recipeModel));
app.get("/recipes", getData(recipeModel));
app.get("/recipes/:id", getDataById(recipeModel));
app.delete("/recipes/:id", deleteDataById(recipeModel));
app.post("/signup", createData(userModel));
app.post("/signin", signinController(userModel));

app.listen(3000, () => {
  console.log("localhost:3000");
});

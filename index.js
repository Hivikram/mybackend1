const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const recipeModel = require("./models.js");
const {
  createData,
  getData,
  getDataById,
  deleteDataById,
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

recipesRouter.post("/", createData(recipeModel));
recipesRouter.get("/", getData(recipeModel));
recipesRouter.get("/:id", getDataById(recipeModel));
recipesRouter.delete("/:id", deleteDataById(recipeModel));

app.listen(3000, () => {
  console.log("localhost:3000");
});

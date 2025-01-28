const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { key } = process.env;
const message = "";

const createData = (model) => {
  return async (req, res) => {
    console.log("post");
    try {
      const data = req.body;
      const create = await model.create(data);
      res.status(200).json({
        status: "success",
        message: data,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getData = (model) => {
  return async (req, res) => {
    try {
      const data = await model.find();
      res.status(200).json({
        status: "success",
        message: data,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};
const getDataById = (model) => {
  return async (req, res) => {
    const id = req.params.id;

    try {
      const data = await model.findById(id);

      if (data == null) {
        throw new Error(`No data on this ${id} to get`);
      }

      res.status(200).json({
        status: "success",
        message: data,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};
const deleteDataById = (model) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const data = await model.findByIdAndDelete(id);

      res.status(200).json({
        status: "sussessfully deleted",
        message: data,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const signupController = (model) => {
  return async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await model.findOne({ email });
      const hashpassword = await bcrypt.hash(password, 10);
      user = model({
        name,
        email,
        password: hashpassword,
      });

      const create = await model.create(user);
      res.status(200).json({
        status: "success",
        message: user,
      });
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const signinController = (model) => {
  return async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await model.findOne({ email });

      const decodepassword = await bcrypt.compare(password, user.password);

      if (decodepassword) {
        const token = jsonwebtoken.sign({ id: user.id }, key, {
          expiresIn: 60 * 60,
        });
        res.cookie("name", token, { maxAge: 600000, httpOnly: true });
        res.status(200).json({
          status: "signin success",
          message: "now you are in the app",
        });
      } else {
        throw new Error("password or email invalied");
      }
    } catch (error) {
      res.status(404).json({
        status: "signin failure",
        message: "password or email invalid",
      });
    }
  };
};
const signoutController = async (req, res) => {
  try {
    const token = await req.cookies.name;

    res.clearCookie("name");
    res.status(200).json({
      status: "logout success",
    });
  } catch (error) {
    res.status(404).json({
      status: "logout failure",
      message: error.message,
    });
  }
};
module.exports = {
  createData,
  getData,
  getDataById,
  deleteDataById,
  signupController,
  signinController,
  signoutController,
};

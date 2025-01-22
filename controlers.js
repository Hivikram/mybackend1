const message = "";

const createData = (model) => {
  console.log("create");
  return async (req, res) => {
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
  console.log("get");
  return async (req, res) => {
    try {
      if (message === null) {
        throw new Error("NO Data to Get");
      }
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

const signinController = (model) => {
  return async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await model.findOne(email);
      console.log(user);
      if (user.password === password) {
        res.status(200).json({
          status: "sucess",
          message: "signin complete",
        });
      } else {
        throw new Error("password or email invalied");
      }
    } catch (error) {
      res.status(404).json({
        status: "failure",
        message: "signin failure",
      });
    }
  };
};

module.exports = {
  createData,
  getData,
  getDataById,
  deleteDataById,
  signinController,
};

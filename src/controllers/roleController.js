import roleApiService from "../services/roleApiService";

const createFunc = async (req, res) => {
  try {
    let data = await roleApiService.createNewRole(req.body);
    return res.status(200).json({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      EM: "error from controller",
      DT: "",
    });
  }
};

const readFunc = async (req, res) => {
  try {
    let data = await roleApiService.getAllRoles();
    return res.status(200).json({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      EM: "error from controller",
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await roleApiService.updateRole(req.body);
    return res.status(200).json({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      EM: "error from controller",
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await roleApiService.deleteRole(req.body.id);
    return res.status(200).json({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      EM: "error from controller",
      DT: "",
    });
  }
};

module.exports = {
  createFunc,
  readFunc,
  updateFunc,
  deleteFunc,
};

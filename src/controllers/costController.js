import costApiService from "../services/costApiService";

const createFunc = async (req, res) => {
  try {
    let data = await costApiService.createNewCost(req.body);
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
    let data = await costApiService.getAllCosts();
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
    let data = await costApiService.updateCost(req.body);
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
    let data = await costApiService.deleteCost(req.body.id);
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

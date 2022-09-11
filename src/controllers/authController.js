import authApiService from "../services/authApiService";

const handleRegister = async (req, res) => {
  try {
    // check req.body
    const {
      body: { email, username, password },
    } = req;

    if (!email || !username || !password) {
      return res.status(200).json({
        EC: "1",
        EM: "Missing required parameters",
        DT: "",
      });
    }

    let data = await authApiService.handleUserRegister(req.body);

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

const handleLogin = async (req, res) => {
  try {
    let data = await authApiService.handleUserLogin(req.body);

    // set cookie
    if (data && data.DT.access_token) {
      await res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    console.log(">>> check", data.DT.access_token);

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

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");

    return res.status(200).json({
      EC: 0,
      EM: "Clear cookies done",
      DT: "Logout Successfully",
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
  handleRegister,
  handleLogin,
  handleLogout,
};

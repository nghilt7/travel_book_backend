import db from "../models/index";
import userUtils from "../utils/userUtils";

const createNewUser = async (data) => {
  try {
    const { email, username, password, address, phone, sex, imgUrl, groupId } =
      data;

    // validate
    let isEmaiExist = await userUtils.checkEmail(email);
    if (isEmaiExist) {
      return {
        EC: 0,
        EM: "Email has already exist",
        DT: "",
      };
    }

    // hash password

    const passwordHash = userUtils.hashUserPassword(password);

    // call api to create user

    await db.User.create({
      email,
      username,
      password: passwordHash,
      address,
      phone,
      sex,
      imgUrl,
      groupId,
    });

    return {
      EC: 0,
      EM: "Create a new user successfully",
      DT: "",
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "email", "username", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (users) {
      return {
        EC: 0,
        EM: "Get all user successfully",
        DT: users,
      };
    } else {
      return {
        EC: 0,
        EM: "Get all user successfully",
        DT: [],
      };
    }
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const updateUser = async (data) => {
  try {
    const { id, username, address, sex, groupId } = data;

    if (!groupId) {
      return {
        EC: 1,
        EM: "Empty group id",
        DT: "",
      };
    }

    let user = await db.User.findOne({
      where: { id },
    });

    if (user) {
      await db.User.update(
        {
          username,
          address,
          sex,
          groupId,
        },
        { where: { id } }
      );
      return {
        EC: 0,
        EM: "Update user successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "User not found",
        DT: "",
      };
    }
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({ where: { id } });

    if (user) {
      await user.destroy();

      return {
        EC: 0,
        EM: "Delete user successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "User is not exist",
        DT: "",
      };
    }
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
};

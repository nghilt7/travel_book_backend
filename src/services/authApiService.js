import db from "../models/index";
import userUtils from "../utils/userUtils";
import JWTApiService from "./JWTApiService";

const handleUserRegister = async (data) => {
  try {
    const { email, username, password } = data;

    // validate

    let user = await db.User.findOne({
      where: { email },
    });

    if (user) {
      return {
        EC: 1,
        EM: "This email have already exist",
        DT: "",
      };
    }

    // hash password

    let passwordHash = await userUtils.hashUserPassword(password);

    await db.User.create({
      email,
      username,
      password: passwordHash,
      groupId: 2,
    });

    return {
      EC: 0,
      EM: "Register successfully",
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

const handleUserLogin = async (data) => {
  try {
    const { email, password } = data;

    // validate

    let user = await db.User.findOne({
      where: { email },
    });

    if (user) {
      // check password

      let isCorrectPassword = await userUtils.checkUserPassword(
        password,
        user.password
      );

      if (isCorrectPassword) {
        // get group and list role of this user
        let GroupWithListRolesOfUser = await JWTApiService.getRolesWithGroup(
          user
        );

        // if password correct then create a token for user
        let payload = {
          email: user.email,
          username: user.username,
          userId: user.id,
          GroupWithListRolesOfUser,
        };

        let token = JWTApiService.createJWT(payload);

        return {
          EC: 0,
          EM: "Login successfully",
          DT: {
            username: user.username,
            email: user.email,
            userId: user.id,
            access_token: token,
            GroupWithListRolesOfUser,
          },
        };
      }
    }

    return {
      EC: 1,
      EM: "Login fail! Please check your email or your password again.",
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

const handleChangeProfile = async (data) => {
  try {
    const { id, username } = data;

    let user = await db.User.findOne({
      where: { id },
    });

    if (user) {
      await user.update({
        username,
      });

      return {
        EC: 0,
        EM: "Update user successfully",
        DT: "",
      };
    }

    return {
      EC: 1,
      EM: "User not found",
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

const handleChangePassword = async (data) => {
  try {
    const { id, currentPassword, newPassword } = data;

    let user = await db.User.findOne({
      where: { id },
    });

    if (user) {
      // check password

      let isCorrectPassword = await userUtils.checkUserPassword(
        currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        return {
          EC: 1,
          EM: "Your current password is not correct",
          DT: "",
        };
      }

      let newPasswordHash = await userUtils.hashUserPassword(newPassword);

      await user.update({
        password: newPasswordHash,
      });

      return {
        EC: 0,
        EM: "Change password successfully",
        DT: "",
      };
    }

    return {
      EC: 1,
      EM: "User not found",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleChangeProfile,
  handleChangePassword,
};

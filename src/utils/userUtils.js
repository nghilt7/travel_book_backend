import bcrypt from "bcryptjs";

import db from "../models/index";

const checkEmail = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const hashUserPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(userPassword, salt);
  return passwordHash;
};

const checkUserPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

module.exports = {
  checkEmail,
  hashUserPassword,
  checkUserPassword,
};

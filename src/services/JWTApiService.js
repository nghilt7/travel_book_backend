import db from "../models/index";

require("dotenv").config();

import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  const key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRESIN });
  } catch (error) {
    console.log(">>> create JWT error >>> ", error);
  }
  return token;
};

const verifyToken = (token) => {
  const key = process.env.JWT_SECRET;
  let decode = null;

  try {
    decode = jwt.verify(token, key);
  } catch (error) {
    console.log(">>> verify token error >>> ", error);
  }
  return decode;
};

const getBearerTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const getRolesWithGroup = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] },
    },
  });

  return roles ? roles : {};
};

module.exports = {
  createJWT,
  verifyToken,
  getBearerTokenFromHeader,
  getRolesWithGroup,
};

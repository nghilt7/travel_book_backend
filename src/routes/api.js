import express from "express";

import testController from "../controllers/testController";
import userController from "../controllers/userController";
import roleController from "../controllers/roleController";
import groupController from "../controllers/groupController";
import tripController from "../controllers/tripController";
import costController from "../controllers/costController";
import authController from "../controllers/authController";
import { checkUserJWT, checkUserPermission } from "../middlewares/JWTAction";

const router = express.Router();

const initApiRoutes = (app) => {
  // middlewares

  router.all("*", checkUserJWT, checkUserPermission);

  router.get("/", testController.testHello);

  // Auth
  router.post("/register", authController.handleRegister);
  router.post("/login", authController.handleLogin);
  router.post("/logout", authController.handleLogout);

  // USER
  router.post("/user/create", userController.createFunc);
  router.get("/user/read", userController.readFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  // ROLE
  router.post("/role/create", roleController.createFunc);
  router.get("/role/read", roleController.readFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);

  // GROUP
  router.post("/group/create", groupController.createFunc);
  router.get("/group/read", groupController.readFunc);
  router.put("/group/update", groupController.updateFunc);
  router.delete("/group/delete", groupController.deleteFunc);

  // GROUP ROLE
  router.post("/role/assign-to-group", roleController.assignRoleToGroup);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);

  // TRIP
  router.post("/trip/create", tripController.createFunc);
  router.get("/trip/read", tripController.readFunc);
  router.put("/trip/update", tripController.updateFunc);
  router.delete("/trip/delete", tripController.deleteFunc);

  router.get("/trip/:userId", tripController.getTripByUserId);

  // COST
  router.post("/cost/create", costController.createFunc);
  router.get("/cost/read", costController.readFunc);
  router.put("/cost/update", costController.updateFunc);
  router.delete("/cost/delete", costController.deleteFunc);

  return app.use("/api/v1", router);
};

export default initApiRoutes;

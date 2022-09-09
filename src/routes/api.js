import express from "express";
import testController from "../controllers/testController";
import userController from "../controllers/userController";
import roleController from "../controllers/roleController";
import groupController from "../controllers/groupController";
import tripController from "../controllers/tripController";
import costController from "../controllers/costController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", testController.testHello);

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

  // COST
  router.post("/cost/create", costController.createFunc);
  router.get("/cost/read", costController.readFunc);
  router.put("/cost/update", costController.updateFunc);
  router.delete("/cost/delete", costController.deleteFunc);

  // COST TRIP
  router.post("/cost/assign-to-trip", costController.assignCostToTrip);
  router.get("/cost/by-trip/:tripId", costController.getCostsByTrip);

  return app.use("/api/v1", router);
};

export default initApiRoutes;

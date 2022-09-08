import express from "express";
import testController from "../controllers/testController";
import userController from "../controllers/userController";
import roleController from "../controllers/roleController";

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

  return app.use("/api/v1", router);
};

export default initApiRoutes;

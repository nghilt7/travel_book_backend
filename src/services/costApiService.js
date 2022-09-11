import db from "../models/index";

const createNewCost = async (data) => {
  try {
    const { costType, costValue, costDescription, tripId } = data;

    if (!tripId) {
      return {
        EC: 1,
        EM: "Not found trip id",
        DT: "",
      };
    }

    await db.Cost.create({
      costType,
      costValue,
      costDescription,
      tripId,
    });

    return {
      EC: 0,
      EM: "Cost create successfully",
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

const getAllCosts = async () => {
  try {
    let cost = await db.Cost.findAll({
      attributes: ["id", "costType", "costValue", "costDescription", "tripId"],
    });

    if (cost) {
      return {
        EC: 0,
        EM: "Get all cost successfully",
        DT: cost,
      };
    }

    return {
      EC: 0,
      EM: "Get all cost successfully",
      DT: [],
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const updateCost = async (data) => {
  try {
    const { id, costValue, costDescription } = data;

    let cost = await db.Cost.findOne({
      where: { id },
    });

    if (cost) {
      await cost.update({
        costValue,
        costDescription,
      });

      return {
        EC: 0,
        EM: "Update cost successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Cost can not found",
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

const deleteCost = async (id) => {
  try {
    let cost = await db.Cost.findOne({
      where: { id },
    });

    if (cost) {
      await cost.destroy();

      return {
        EC: 0,
        EM: "Delete cost successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Cost can not found",
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
  createNewCost,
  getAllCosts,
  updateCost,
  deleteCost,
};

import db from "../models/index";

const createNewCost = async (data) => {
  try {
    const { costType, costValue, costDescription } = data;

    let cost = await db.Cost.findOne({
      where: { costType },
    });

    if (cost) {
      return {
        EC: 1,
        EM: "This cost type have already exist",
        DT: "",
      };
    }

    await db.Cost.create({
      costType,
      costValue,
      costDescription,
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
      attributes: ["id", "costType", "costValue", "costDescription"],
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
    const { id, costType, costValue, costDescription } = data;

    let cost = await db.Cost.findOne({
      where: { id },
    });

    if (cost) {
      await cost.update({
        costType,
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

const getCostsByTrip = async (tripId) => {
  try {
    if (!tripId) {
      return {
        EC: 1,
        EM: "Not found trip id",
        DT: "",
      };
    }

    let costs = await db.Trip.findOne({
      where: { id: tripId },
      attributes: [
        "id",
        "tripName",
        "startPlace",
        "startDate",
        "destination",
        "duration",
      ],
      include: {
        model: db.Cost,
        attributes: ["id", "costType", "costValue", "costDescription"],
        through: { attributes: [] },
      },
    });

    return {
      EM: `Get costs by trip successfully`,
      EC: 0,
      DT: costs,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const assignCostToTrip = async (data) => {
  try {
    const { tripId, costId } = data;

    // check trip is exist?
    let trip = await db.Trip.findOne({
      where: { id: tripId },
    });

    if (!trip) {
      return {
        EC: 1,
        EM: "Trip is not exist",
        DT: "",
      };
    }

    // check cost is exist?
    let cost = await db.Cost.findOne({
      where: { id: costId },
    });

    if (!cost) {
      return {
        EC: 1,
        EC: "Cost is not exist",
        DT: "",
      };
    }

    await db.Trip_Cost.create({
      tripId,
      costId,
    });

    return {
      EC: 0,
      EM: "Assign cost to trip successfully",
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

module.exports = {
  createNewCost,
  getAllCosts,
  updateCost,
  deleteCost,
  getCostsByTrip,
  assignCostToTrip,
};

import db from "../models/index";

const createNewTrip = async (data) => {
  try {
    const { tripName, startPlace, startDate, destination, duration, userId } =
      data;

    await db.Trip.create({
      tripName,
      startPlace,
      startDate,
      destination,
      duration,
      userId,
    });

    return {
      EC: 0,
      EM: "Trip create successfully",
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

const getAllTrips = async () => {
  try {
    let trip = await db.Trip.findAll({
      attributes: [
        "id",
        "tripName",
        "startPlace",
        "startDate",
        "destination",
        "duration",
        "userId",
      ],
      include: {
        model: db.User,
        attributes: [
          "id",
          "email",
          "username",
          "address",
          "phone",
          "sex",
          "imgUrl",
          "groupId",
        ],
        include: {
          model: db.Group,
          attributes: ["id", "name", "description"],
        },
      },
    });

    if (trip) {
      return {
        EC: 0,
        EM: "Get all trip successfully",
        DT: trip,
      };
    }

    return {
      EC: 0,
      EM: "Get all trip successfully",
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

const updateTrip = async (data) => {
  try {
    const {
      id,
      tripName,
      startPlace,
      startDate,
      destination,
      duration,
      userId,
    } = data;

    let trip = await db.Trip.findOne({
      where: { id },
    });

    if (trip) {
      await trip.update({
        tripName,
        startPlace,
        startDate,
        destination,
        duration,
        userId,
      });

      return {
        EC: 0,
        EM: "Update trip successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Trip can not found",
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

const deleteTrip = async (id) => {
  try {
    let trip = await db.Trip.findOne({
      where: { id },
    });

    if (trip) {
      await trip.destroy();

      return {
        EC: 0,
        EM: "Delete trip successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Trip can not found",
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

const getTripByUserId = async (userId) => {
  try {
    let trip = await db.Trip.findAll({
      where: { userId },
    });

    if (trip) {
      return {
        EC: 0,
        EM: "Get trip by user id successfully",
        DT: trip,
      };
    } else {
      return {
        EC: 0,
        EM: "Get trip by user id successfully",
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
  createNewTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
  getTripByUserId,
};

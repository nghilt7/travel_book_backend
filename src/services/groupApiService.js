import db from "../models/index";

const createNewGroup = async (data) => {
  try {
    const { name, description } = data;

    let group = await db.Group.findOne({
      where: { name },
    });

    if (group) {
      return {
        EC: 1,
        EM: "This group name has already exist",
        DT: "",
      };
    }

    await db.Group.create({
      name,
      description,
    });
    return {
      EC: 0,
      EM: "Create new group successfully",
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

const getAllGroups = async () => {
  try {
    let groups = await db.Group.findAll();

    if (groups) {
      return {
        EC: 0,
        EM: "Get all group successfully",
        DT: groups,
      };
    }

    return {
      EC: 0,
      EM: "Get all group successfully",
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

const updateGroup = async (data) => {
  try {
    const { id, name, description } = data;

    let group = await db.Group.findOne({
      where: { id },
    });

    if (group) {
      await db.Group.update(
        {
          name,
          description,
        },
        { where: { id } }
      );
      return {
        EC: 0,
        EM: "Update group successfully",
        DT: "",
      };
    }

    return {
      EC: 1,
      EM: "Group not found",
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

const deleteGroup = async (id) => {
  try {
    let group = await db.Group.findOne({
      where: { id },
    });

    if (group) {
      await group.destroy();
      return {
        EC: 0,
        EM: "Delete group successfully",
        DT: "",
      };
    }

    return {
      EC: 1,
      EM: "Group not found",
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
  createNewGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
};

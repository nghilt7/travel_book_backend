import db from "../models/index";

const createNewRole = async (data) => {
  try {
    const { url, description } = data;
    let role = await db.Role.findOne({ where: { url } });

    if (role) {
      return {
        EC: 1,
        EM: "This role is adready exist",
        DT: "",
      };
    }

    await db.Role.create({
      url,
      description,
    });

    return {
      EC: 0,
      EM: "Create new role successfully",
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

const getAllRoles = async () => {
  try {
    let roles = await db.Role.findAll({});
    if (roles) {
      return {
        EC: 0,
        EM: "Get all role successfully",
        DT: roles,
      };
    } else {
      return {
        EC: 0,
        EM: "Get all role successfully",
        DT: [],
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

const updateRole = async (data) => {
  try {
    const { id, url, description } = data;
    let role = await db.Role.findOne({
      where: { id },
    });
    if (role) {
      await db.Role.update(
        {
          url,
          description,
        },
        { where: { id } }
      );
      return {
        EC: 0,
        EM: "Update role successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Can not found this role",
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

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id },
    });
    if (role) {
      await role.destroy();

      return {
        EC: 0,
        EM: "Delete role successfully",
        DT: "",
      };
    } else {
      return {
        EC: 1,
        EM: "Can not found this role",
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

const getRoleByGroup = async (groupId) => {
  try {
    if (!groupId) {
      return {
        EC: 1,
        EM: "Not found group id",
        DT: "",
      };
    }

    let roles = await db.Group.findOne({
      where: { id: groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });

    return {
      EM: `Get roles by group successfully`,
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "error from service",
      DT: "",
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    const { roleId, groupId } = data;

    // check role is exist?
    let role = await db.Role.findOne({
      where: { id: roleId },
    });

    if (!role) {
      return {
        EC: 1,
        EM: "Role is not exist",
        DT: "",
      };
    }

    // check group is exist?
    let group = await db.Group.findOne({
      where: { id: groupId },
    });

    if (!group) {
      return {
        EC: 1,
        EC: "Group is not exist",
        DT: "",
      };
    }

    await db.Group_Role.create({
      roleId,
      groupId,
    });

    return {
      EC: 0,
      EM: "Assign role to group successfully",
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
  createNewRole,
  getAllRoles,
  updateRole,
  deleteRole,
  assignRoleToGroup,
  getRoleByGroup,
};

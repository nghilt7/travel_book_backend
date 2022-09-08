"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "nghilt@gmail.com",
        username: "tannghi",
        password: "123456",
        address: "HCMC",
        phone: "090980909",
        sex: "Male",
        imgUrl: "",
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      Array.from({ length: 2 }).map((_, i) => ({
        name: `user${i}`,
        email: `user${i}@exemple.com`,
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};

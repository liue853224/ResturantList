"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "restaurants",
      Array.from({ length: 8 }).map((_, i) => ({
        name: `餐廳${i}`,
        name_en: `restaurant${i}`,
        category: "category",
        image: "image",
        location: "location",
        phone: "phone",
        google_map: "google_map",
        rating: "rating",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants");
  },
};

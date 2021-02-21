'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Items', [{
      title: 'Item One',
      userId: 1,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }, {
      title: 'Item Two',
      userId: 1,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }, {
      title: 'Item Three',
      userId: 1,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Items', null, {});

  }
};

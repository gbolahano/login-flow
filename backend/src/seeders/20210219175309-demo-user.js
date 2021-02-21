'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'jdoe@mail.com',
      password: '$2a$10$PmrISXo6QzLYsH7ML63HAe1OR0nZWqnitQpjoIPzp8IGbv81AVo62',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
  }
};

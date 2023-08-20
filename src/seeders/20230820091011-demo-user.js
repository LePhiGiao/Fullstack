'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user',
      [
        {
          email: 'John Doe1',
          password: '123',
          username: 'Fake1',
        },
        {
          email: 'John Doe2',
          password: '123',
          username: 'Fake2',
        },
        {
          email: 'John Doe3',
          password: '123',
          username: 'Fake3',
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Users', [{
      firstName: 'Neil',
      lastName: 'Pitts',
      email: 'cornelius_pitts@yahoo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'George',
      lastName: '????',
      email: 'cornelius_pitts@yahoo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Kendra',
      lastName: 'Ingram',
      email: 'cornelius_pitts@yahoo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Users', null, {});
  }
};

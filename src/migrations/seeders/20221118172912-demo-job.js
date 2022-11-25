'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Jobs', [{
      department: 'Engineering',
      role: 'Director of Engineering',
      description: 'We are in the process of buulding our team and need ...',
      posted: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Jobs', null, {});
  }
};

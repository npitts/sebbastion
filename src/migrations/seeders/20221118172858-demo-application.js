'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Applications', [{
      user_id: '3434324-34324324-3243243-324324324',
      job_id: '8897987-435435-454354-43545345',
      status: 'Pending Review',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Applications', null, {});
  }
};

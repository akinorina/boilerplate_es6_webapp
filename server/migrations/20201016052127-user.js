'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING,
      after: 'name_kana'
    }).then(() => {
      return queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
        after: 'email'
      })
    })

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('users', 'email').then(() => {
      return queryInterface.removeColumn('users', 'password')
    })

  }
};

'use strict';

const crypto = require('crypto');

/**
 * パスワード文字列のHash化
 *
 */
function makeHashForPassword (sPassword) {
  return crypto.createHash('sha256').update(sPassword).digest('hex')
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [{
      name: '仲田明紀',
      name_kana: 'なかたあきのり',
      email: 'nakata@real-its.com',
      password: makeHashForPassword('aaaa1111'),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: '鈴木一郎',
      name_kana: 'すずきいちろう',
      email: 'suzuki@real-its.com',
      password: makeHashForPassword('bbbb2222'),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: '佐藤次郎',
      name_kana: 'さとうじろう',
      email: 'satou@real-its.com',
      password: makeHashForPassword('cccc3333'),
      created_at: new Date(),
      updated_at: new Date()
    }]);

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('users', null, {});

  }
};

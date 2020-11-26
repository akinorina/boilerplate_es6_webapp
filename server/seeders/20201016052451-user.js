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
      name: '鈴木　一郎',
      name_kana: 'すずき　いちろう',
      email: 'suzuki@gmail.com',
      password: makeHashForPassword('aaaa1111'),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: '佐藤　二郎',
      name_kana: 'さとう　じろう',
      email: 'satou@gmail.com',
      password: makeHashForPassword('bbbb2222'),
      created_at: new Date(),
      updated_at: new Date()
    },{
      name: '本田　三郎',
      name_kana: 'ほんだ　さぶろう',
      email: 'honda@gmail.com',
      password: makeHashForPassword('cccc3333'),
      created_at: new Date(),
      updated_at: new Date()
    }]);

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('users', null, {});

  }
};

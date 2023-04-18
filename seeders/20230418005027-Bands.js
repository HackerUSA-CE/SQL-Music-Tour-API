'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bands', [{
      name: '3 Doors Down',
      genre: 'Alt Rock',
      available_start_time: '2023-05-01T12:00:00',
      end_time: '2023-09-30T12:00:00'
    },{
      name: 'System of a Down',
      genre: 'Nu Metal',
      available_start_time: '2023-06-01T12:00:00',
      end_time: '2023-10-31T23:00:00'
    },{
      name: 'AC/DC',
      genre: 'Classic Rock',
      available_start_time: '2023-04-01T12:00:00',
      end_time: '2023-08-15T12:00:00'
    },{
      name: 'Tame Impala',
      genre: 'Psychedelic Rock',
      available_start_time: '2023-06-15T12:00:00',
      end_time: '2023-09-30T12:00:00'
    },{
      name: 'Massive Attack',
      genre: 'Trip-Hop',
      available_start_time: '2023-07-15T12:00:00',
      end_time: '2023-08-05T12:00:00'
    },{
      name: 'Blink-182',
      genre: 'Punk Rock',
      available_start_time: '2023-05-01T12:00:00',
      end_time: '2023-10-31T12:00:00'
    },{
      name: 'Yawning Man',
      genre: 'Desert Rock',
      available_start_time: '2023-05-01T12:00:00',
      end_time: '2023-09-30T12:00:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bands', null, {});
  }
};

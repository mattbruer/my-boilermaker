const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  measures: {
    type: Sequelize.STRING,
    defaultValue: '[["C","G"]]',
  },
  timeSignature: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  key: {
    type: Sequelize.STRING,
    // allowNull: false,
    defaultValue: 'C',
  },
  capo: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Song;

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
  timeSignature: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  key: {
    type: Sequelize.STRING,
    // allowNull: false,
    defaultValue: 'C',
  },
});

module.exports = Song;

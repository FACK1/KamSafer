const Sequelize = require('sequelize');

const seq = require('../config/db_connection');

const car = seq.define(
  'car',
  {
    model_color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    car_no: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    owner: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    last_log_km: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = car;

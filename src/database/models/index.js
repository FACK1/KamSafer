const car = require('./car');
const logs = require('./logs');
const notes = require('./notes');

const db = require('../config/db_connection');

logs.belongsTo(car, {
  onDelete: 'CASCADE',
  foreignKey: 'car_id',
  targetKey: 'id',
});

logs.hook('afterCreate', log => car.update({ last_log_km: log.end_km }, { where: { id: log.car_id } }));
const seq = new Promise((resolve, reject) => {
  db.sync({ force: true })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = {
  car,
  logs,
  notes,
  seq,
};

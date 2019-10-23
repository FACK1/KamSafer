const { car, logs } = require('../database/models');

exports.get = (req, res) => {
  console.log('hello');
  const { car_id } = req.cookies;
  car
    .findAll({
      where: { id: car_id },
      attributes: ['last_log_km'],
      raw: true,
    })
    .then((result) => {
      logs
        .findAll({
          limit: 1,
          where: { car_id },
          attributes: ['driver_name'],
          order: [['createdAt', 'DESC']],
        })
        .then((result2) => {
          result[0].driver_name = result2[0].dataValues.driver_name;
          res.json(result);
        });
    })
    .catch(() => res.status(500).end());
};

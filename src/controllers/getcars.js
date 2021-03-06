const { car } = require('../database/models');

exports.get = (req, res) => {
  car.findAll({
    attributes: ['id', 'model_color', 'car_no', 'owner', 'last_log_km'],
    raw: true,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      (res.status(500).end());
    });
};

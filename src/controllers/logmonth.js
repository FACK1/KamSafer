const Sequelize = require('sequelize');

const excel = require('exceljs');
const { logs } = require('../database/models');

const Op = Sequelize.Op;
exports.get = (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const from = new Date(year, month - 1, 1).toISOString();
  const to = new Date(year, month, 1).toISOString();
  const car_id = req.cookies.car_id;
  logs
    .findAll({
      where: {
        createdAt: {
          [Op.between]: [from, to],
        },
        car_id,
      },
      attributes: ['purpose', 'note', 'driver_name', 'car_id', 'createdAt', 'start_km', 'end_km'],
      raw: true,
    })
    .then((result) => {
      result = result.map((el) => {
        const o = Object.assign({}, el);
        o['Total Trip'] = el.end_km - el.start_km;
        return o;
      });

      const workbook = new excel.Workbook();
      const sheet = workbook.addWorksheet('MySheet');

      sheet.addRow().values = Object.keys(result[0]);
      result.forEach((log) => {
        sheet.addRow().values = Object.values(log);
      });
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=logs.xlsx');

      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    })
    .catch(() => res.status(500).end());
};

const { fetchDistance } = require("../models/fetchDistance");

exports.getDistance = (req, res, next) => {
  fetchDistance(req.query).then((response) => {
    res.status(200).send(response);
  });
};

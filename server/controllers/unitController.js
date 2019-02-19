var db = require("../db");

const getUnits = (request, response) => {
  db.query("SELECT * FROM unit", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getUnits
};

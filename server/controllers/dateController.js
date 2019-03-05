var db = require("../db");

const getMinDate = (request, response) => {
  db.query("SELECT created_date FROM kindergarten WHERE id = 1", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getMinDate
};
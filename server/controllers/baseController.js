var db = require("../db");

const getBases = (request, response) => {
  db.query("SELECT * FROM base", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getBases
};

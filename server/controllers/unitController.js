var db = require("../db");

const getUnits = (request, response) => {
  db.query("SELECT * FROM unit", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching units");
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getUnits
};

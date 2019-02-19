var db = require("../db");

const getHouses = (request, response) => {
  db.query("SELECT * FROM house", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getHouses
};

var db = require("../db");

const getHouses = (request, response) => {
  db.query("SELECT * FROM house", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching houses from DB");
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getHouses
};

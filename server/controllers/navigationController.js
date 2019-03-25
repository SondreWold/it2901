var db = require("../db");

// TODO  send id from settings page instead of brute typing id = 1
const getKindergartenName = (request, response) => {
  db.query("SELECT name FROM kindergarten WHERE id = 1", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching kindergarten name");
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getKindergartenName
};

var db = require("../db");

// there is only one kindergarten at time of delivery
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

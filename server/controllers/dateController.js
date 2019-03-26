var db = require("../db");

const getMinDate = (request, response) => {
  db.query(
    "SELECT created_date FROM kindergarten WHERE id = 1",
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching min date from DB");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getMinDate
};

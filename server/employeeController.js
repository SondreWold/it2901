var db = require("./db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employees", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getEmployees
};

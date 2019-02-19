var db = require("../db");

const getAbsentChildren = (request, response) => {
  db.query("SELECT * FROM absence_children", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAbsentEmployees = (request, response) => {
  db.query("SELECT * FROM absence_employee", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getAbsentEmployees,
  getAbsentChildren
};

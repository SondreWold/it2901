var db = require("../db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const insertNewEmployee = (request, response) => {
  let query = db.prepareStatement(
    "INSERT INTO employee " +
      "(first_name, last_name, base_id, position, movable) values (?,?,?,?,?)"
  );
  //.body? Sender inn et JSON-objekt i request
  query.setString(1, request.params.firstName);
  query.setString(2, request.params.lastName);
  query.setNumber(3, request.params.baseID);
  query.setNumber(4, request.params.position);
  query.setNumber(5, request.params.movable);
  db.query(query, error => {
    if ((error, results)) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEmployeesSearch = (request, response) => {
  let searchToken = request.params.name;
  db.query(
    `	SELECT * FROM employee 
    	WHERE LOWER(employee.first_name) LIKE LOWER($1)
    	OR LOWER(employee.last_name) LIKE LOWER($1)`,
    ["%" + searchToken + "%"],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getEmployees,
  getEmployeesSearch,
  insertNewEmployee
};

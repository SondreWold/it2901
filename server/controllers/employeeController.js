var db = require("../db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteEmployee = (request, response) => {
  let id = request.params.id;
  db.query("DELETE FROM employee where id = $1", [id], (error, results) => {
    if (error) {
      response.status(200).send("Ansatt ble ikke slettet");
      throw error;
    }
    response.status(200).send("Ansatt ble slettet");
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
  deleteEmployee,
  getEmployeesSearch
};

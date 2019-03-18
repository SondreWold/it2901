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
      response.status(200).send("0");
      throw error;
    }
    response.status(200).send("1");
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

const getFreeTemp = (request, response) => {
  let date = request.params.date;
  db.query(
    "SELECT * FROM employee e LEFT JOIN moved_employee m ON m.employee_id = e.id AND m.date = $1 WHERE m.employee_id IS NULL AND e.position = 2 ORDER BY e.first_name ASC",
    [date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWorkingEmployees = (request, response) => {
  let date = request.params.date;
  db.query(
    "SELECT m.employee_id, m.base_id FROM moved_employee m WHERE date=$1 \
    UNION \
      SELECT e.id, e.base_id FROM employee e WHERE e.position = 1 AND e.id \
      NOT IN (SELECT employee_id FROM moved_employee WHERE date = $1 \
        UNION SELECT employee_id FROM absence_employee WHERE date = $1);",
    [date],
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
  getEmployeesSearch,
  getFreeTemp,
  getWorkingEmployees
};

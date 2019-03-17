var db = require("../db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employee", (error, results) => {
    if (error) {
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

const addTempToBase = (request, response) => {
  const { date, employeeId, baseId } = request.body;

  console.log(date);
  console.log(employeeId);
  console.log(baseId);

  db.query(
    "INSERT INTO moved_employee (date, employee_id, base_id) VALUES ($1, $2, $3)",
    [date, employeeId, baseId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(`Inserted employee ${employeeId} on day ${date}`);
    }
  );
};

module.exports = {
  getEmployees,
  getEmployeesSearch,
  getFreeTemp,
  addTempToBase
};

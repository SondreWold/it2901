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

const insertNewEmployee = (request, response) => {
  let { firstName, lastName, baseID, moveable, position } = request.body;

  db.query(
    "INSERT INTO EMPLOYEE (first_name, last_name, base_id, moveable, position) VALUES ($1, $2, $3, b'" +
      moveable +
      "', $4)",
    [firstName, lastName, baseID, position],
    (error, results) => {
      if (error) {
        if (error.code === "23505") {
          response.status(202).send(`Already existing entry in the DB`);
        } else {
          console.log(error);
          throw error;
        }
      } else {
        response.status(200).send(`Inserted employee ${firstName}`);
      }
    }
  );
};

module.exports = {
  getEmployees,
  getEmployeesSearch,
  insertNewEmployee,
  deleteEmployee,
  getEmployeesSearch,
  getFreeTemp
};

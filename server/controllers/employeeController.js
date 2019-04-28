var db = require("../db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching employees from DB");
    }
    response.status(200).json(results.rows);
  });
};

const getEmployee = (request, response) => {
  let id = request.params.id;
  db.query("SELECT * FROM employee where id = $1", [id], (error, results) => {
    if (error) {
      response.status(404).send("error getting employee");
    }
    response.status(200).json(results.rows);
  });
};

const getLatestInsertedEmployee = (request, response) => {
  db.query("SELECT MAX(id) FROM employee", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching latest employee");
    }
    response.status(200).json(results.rows);
  });
};

const deleteEmployee = (request, response) => {
  let id = request.params.id;
  db.query("DELETE FROM employee where id = $1", [id], (error, results) => {
    if (error) {
      response.status(200).send("0");
    }
    response.status(200).send("1");
  });
};

const getEmployeesSearch = (request, response) => {
  let searchToken = request.params.name;
  db.query(
    "SELECT * FROM employee \
    WHERE LOWER(CONCAT(employee.first_name, ' ', employee.last_name)) LIKE LOWER($1)",
    ["%" + searchToken + "%"],
    (error, results) => {
      if (error) {
        response.status(404).send("Faield fetching employees from DB");
      }
      response.status(200).json(results.rows);
    }
  );
};

const getFreeTemp = (request, response) => {
  let date = request.params.date;
  db.query(
    `
    SELECT * FROM employee e 
    LEFT JOIN moved_employee m ON m.employee_id = e.id 
    AND m.date = $1 
    WHERE m.employee_id IS NULL AND e.position = 2
    AND e.id NOT IN (SELECT a.employee_id FROM absence_employee a WHERE date=$1)
    ORDER BY e.first_name ASC`,
    [date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching available temps from DB ");
      }
      response.status(200).json(results.rows);
    }
  );
};

const getWorkingEmployees = (request, response) => {
  let date = request.params.date;
  db.query(
    "SELECT m.base_id, e1.id AS employee_id, e1.first_name, e1.last_name, e1.position FROM moved_employee m INNER JOIN employee e1 ON m.employee_id = e1.id WHERE date=$1 \
    AND m.employee_id NOT IN (SELECT employee_id FROM absence_employee WHERE date=$1) \
      UNION \
        SELECT e2.base_id, e2.id, e2.first_name, e2.last_name, e2.position FROM employee e2 WHERE e2.position = 1 AND (e2.start_date <=$1 OR e2.start_date IS NULL) AND e2.id \
        NOT IN (SELECT employee_id FROM moved_employee WHERE date = $1 \
          UNION SELECT employee_id FROM absence_employee WHERE date = $1) ORDER BY base_id, position, first_name;",
    [date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching working employees");
      } else {
        let workingEmployyes = {};
        for (let i = 0; i < results.rows.length; i++) {
          let key = results.rows[i].base_id;
          if (workingEmployyes[key]) {
            workingEmployyes[key].push(results.rows[i]);
          } else {
            workingEmployyes[key] = [results.rows[i]];
          }
        }
        response.status(200).json(workingEmployyes);
      }
    }
  );
};

const insertNewEmployee = (request, response) => {
  let { firstName, lastName, baseID, position, id, startDate } = request.body;

  db.query(
    "INSERT INTO EMPLOYEE (first_name, last_name, base_id, position, start_date) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, baseID, position, startDate],
    (error, results) => {
      if (error) {
        if (error.code === "23505") {
          console.log("fillern");
        } else {
          response.status(404).send("Failed inserting new employee to DB");
        }
      } else {
        response.status(200).send(`Inserted employee ${firstName}`);
      }
    }
  );
};

const editEmployee = (request, response) => {
  let { firstName, lastName, baseID, position, startDate } = request.body;
  let id = request.params.id;
  db.query(
    "UPDATE EMPLOYEE SET first_name=$1, last_name=$2, base_id=$3, position=$4, start_date=$5 WHERE id=$6",
    [firstName, lastName, baseID, position, startDate, id],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(404).send("Failed editing employee in DB");
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
  getFreeTemp,
  getWorkingEmployees,
  getLatestInsertedEmployee,
  getEmployee,
  editEmployee
};

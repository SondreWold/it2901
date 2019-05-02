var db = require("../db");

const getMovedEmployee = (request, response) => {
  const date = request.params.date;
  db.query(
    "SELECT employee_id, base_id FROM moved_employee WHERE date = $1",
    [date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching moved employee");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const updateMovedEmployee = (request, response) => {
  const baseId = parseInt(request.params.baseId);
  const employeeId = parseInt(request.params.employeeId);
  const date = request.params.date;

  db.query(
    "UPDATE moved_employee SET base_id = $1 WHERE employee_id = $2 AND date = $3",
    [baseId, employeeId, date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed updating moved employee");
      } else {
        response
          .status(200)
          .send(`Base ID of employee modified with baseId: ${baseId}`);
      }
    }
  );
};

const addMovedEmployee = (request, response) => {
  const { date, employeeId, baseId } = request.body;

  db.query(
    "INSERT INTO moved_employee (date, employee_id, base_id) VALUES ($1, $2, $3)",
    [date, employeeId, baseId],
    (error, results) => {
      if (error) {
        response.status(404).send(error);
      } else {
        response.status(200).json({
          message: `Inserted moved employee ${employeeId}`,
          movedEmployee: { date, employeeId, baseId }
        });
      }
    }
  );
};

const deleteMovedEmployee = (request, response) => {
  const employeeId = parseInt(request.params.employeeId);
  const date = request.params.date;
  db.query(
    "DELETE FROM moved_employee WHERE employee_id = $1 AND date = $2",
    [employeeId, date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed deleting moved employee");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getMovedEmployee,
  updateMovedEmployee,
  addMovedEmployee,
  deleteMovedEmployee
};

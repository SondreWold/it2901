var db = require("../db");

const getMovedEmployee = (request, response) => {
	const date = request.params.date;
  db.query(
  	"SELECT employee_id, base_id FROM moved_employee WHERE date = $1",
  	[date],
  	(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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
        throw error;
      }
      response.status(200).send(`Base ID of employee modified with baseId: ${baseId}`);
    }
  );
};

module.exports = {
	getMovedEmployee,
	updateMovedEmployee
};

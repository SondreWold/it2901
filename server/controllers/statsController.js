var db = require("../db");

const getAbsentEmployeesPerMonth = (request, response) => {
  const month = parseInt(request.params.month);
  db.query(
    `
		SELECT date, COUNT(employee_id)
		FROM absence_employee
		WHERE DATE_PART('month', date) = $1
		GROUP BY date;
		`,
    [month],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAbsentEmployeesPerMonth
};

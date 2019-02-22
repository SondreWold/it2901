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

const updateAbsentChildren = (request, response) => {
  const baseId = parseInt(request.params.baseId);
  const date = request.params.date;
  const { amount } = request.body;

  db.query(
    "UPDATE absence_children SET children = $1 WHERE base_id = $2 AND date = $3",
    [amount, baseId, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Absent children modified with ID: ${baseId}`);
    }
  );
};

module.exports = {
  getAbsentEmployees,
  getAbsentChildren,
  updateAbsentChildren
};

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

const updateChildren = (request, response) => {
  const id = parseInt(request.params.id);
  const { amount } = request.body;

  db.query(
    "UPDATE absence_children SET children = $1 WHERE base_id = $2",
    [amount, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Absent children modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getAbsentEmployees,
  getAbsentChildren,
  updateChildren
};

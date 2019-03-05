var db = require("../db");

const getAbsentChildren = (request, response) => {
  db.query(
    "SELECT absence_children.date, absence_children.children, absence_children.base_id, base.total_children \
    FROM absence_children \
    INNER JOIN base ON absence_children.base_id = base.id\
    WHERE absence_children.date = $1;",

    [request.params.date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
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

const insertAbsentEmployee = (request, response) => {
  const empId = parseInt(request.params.empId);
  const date = request.params.date;

  db.query(
  	"INSERT INTO absence_employee VALUES ($1, $2)",
    [date, empId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Inserted absent employee ${empId} on day ${date}`);
    }
  );
};


module.exports = {
  getAbsentEmployees,
  getAbsentChildren,
  updateAbsentChildren,
  insertAbsentEmployee
};

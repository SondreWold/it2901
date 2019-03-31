var db = require("../db");
const pgp = require("pg-promise")({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});

const getAbsentChildren = (request, response) => {
  db.query(
    "SELECT absence_children.date, absence_children.children, absence_children.base_id, base.total_children \
    FROM absence_children \
    INNER JOIN base ON absence_children.base_id = base.id\
    WHERE absence_children.date = $1;",
    [request.params.date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching all absent children");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

//If there is no absent children for that day, insert a row with 0 values
const insertNewAbsentChildrenRow = (request, response) => {
  let date = request.params.date;
  const cs = new pgp.helpers.ColumnSet(["date", "children", "base_id"], {
    table: "absence_children"
  });
  const values = [
    { date: date, children: 0, base_id: 1 },
    { date: date, children: 0, base_id: 2 },
    { date: date, children: 0, base_id: 3 },
    { date: date, children: 0, base_id: 4 }
  ];
  const query = pgp.helpers.insert(values, cs);
  db.query(query)
    .then(data => {
      response
        .status(200)
        .send("Inserted 4 rows of 0-values for children_absence entities");
    })
    .catch(error => {
      response
        .status(404)
        .send("Failed inserting empty row for absent children");
    });
};

const getAbsentEmployees = (request, response) => {
  db.query("SELECT * FROM absence_employee", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching absent employees");
    } else {
      response.status(200).json(results.rows);
    }
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
        response.status(404).send("Failed updating absent children");
      } else {
        response
          .status(200)
          .send(`Absent children modified with ID: ${baseId}`);
      }
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
        if (error.code === "23505") {
          response.status(202).send(`Already existing entry in the DB`);
        } else {
          response.status(404).send("Failed inserting absent employee to DB");
        }
      } else {
        response
          .status(200)
          .send(`Inserted absent employee ${empId} on day ${date}`);
      }
    }
  );
};

const getAbsenceForEmployee = (request, response) => {
  let id = request.params.id;
  db.query(`
  	SELECT * FROM absence_employee 
    WHERE employee_id = $1
    ORDER BY date DESC`,
    [id],
    (error, results) => {
      if (error) {
        response
          .status(404)
          .send("Failed fetching absence for employee: " + id);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getAbsentEmployees,
  getAbsentChildren,
  updateAbsentChildren,
  insertAbsentEmployee,
  insertNewAbsentChildrenRow,
  getAbsenceForEmployee
};

var db = require("../db");

const getEmployees = (request, response) => {
  db.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const insertNewEmployee = (request, response) => {
  //TODO: sjekk hvordan employee-tabellen egentlig ser ut mtp felter osv,
  //slik at qeryen med felter som skal legges til i er riktig (name, position, movable)
  let query = db.prepareStatement(
    "INSERT INTO Employee " + "(name, position, movable) values (?,?,?)"
  );
  //.body? Sender inn et JSON-objekt i request
  query.setString(1, request.params.name);
  query.setString(2, request.params.position);
  query.setNumber(3, request.params.movable);
  db.query(query, error => {
    if (error) {
      throw error;
    }
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

module.exports = {
  getEmployees,
  getEmployeesSearch
};

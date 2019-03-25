var db = require("../db");

const getBases = (request, response) => {
  db.query("SELECT * FROM base", (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching bases from DB");
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getBaseById = (request, response) => {
  let id = request.params.id;
  db.query("SELECT * FROM base where id=$1", [id], (error, results) => {
    if (error) {
      response.status(404).send("Failed fetching base by id from DB");
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getBases,
  getBaseById
};

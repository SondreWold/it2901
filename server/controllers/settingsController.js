var db = require("../db");

const editBaseSettings = (request, response) => {
  let { name, total_children, ratio } = request.body;
  const id = parseInt(request.params.id);
  db.query(
    `
		UPDATE base
		SET name = $2,
				total_children = $3,
				ratio = $4
		WHERE id=$1;`,
    [id, name, total_children, ratio],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed updating ratio");
      } else {
        response.status(200).json({
          message: "Edited base",
          base: { id, name, total_children, ratio }
        });
      }
    }
  );
};

module.exports = {
  editBaseSettings
};

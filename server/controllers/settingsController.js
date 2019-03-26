var db = require("../db");

const editBaseSettings = (request, response) => {
	const id = parseInt(request.params.id);
	const name = request.params.name;
	const total_children = parseInt(request.params.total_children);
	const ratio = parseFloat(request.params.ratio);

	db.query(`
		UPDATE base
		SET name = $2,
				total_children = $3,
				ratio = $4
		WHERE id=$1;`,
		[id, name, total_children, ratio],
		(error, results) => {
			if (error) {
        response.status(404).send("Failed updating ratio");
      }
      else {
      		response
	        .status(200)
	        .send(`Updated base ${id} with name: ${name}, total_children: ${total_children} and ratio: ${ratio}`);		
      	}
      }
	);
};


module.exports = {
	editBaseSettings
};
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
        response.status(404).send("Failed fetching absent employee pr month");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getRatio = (request, response) => {
  const fromDate = request.params.fromDate;
  const toDate = request.params.toDate;
  db.query(
    `
		SELECT s.date, s.base_id, s.ratio, b.name
		FROM staff_ratio s
		INNER JOIN base b on s.base_id = b.id
		WHERE s.date BETWEEN $1 and $2
		ORDER BY s.date, s.base_id;
		`,
    [fromDate, toDate],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching absent employee pr month");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const updateRatio = (request, response) => {
	const date = request.params.date;
	const baseId = parseInt(request.params.baseId);
	const ratio = parseFloat(request.params.ratio);

	db.query(`
		UPDATE staff_ratio SET ratio=$3 WHERE date=$1 AND base_id=$2;`,
		[date, baseId, ratio],
		(error, results) => {
			if (error) {
        response.status(404).send("Failed updating ratio");
      }
      else {
      	if (results.rowCount === 0){
      		db.query(`
						INSERT INTO staff_ratio (date, base_id, ratio)
						VALUES ($1, $2, $3);`,
						[date, baseId, ratio],
						(error, results) => {
							if (error) {
								response.status(404).send("Failed inserting ratio");
					    }
					    else {
					    	response
					      .status(200)
					      .send(`Inserted ratio ${ratio} on day ${date} in base ${baseId}`);	
					    }
					    
						} 
					);
      	}
      	else {
      		response
	        .status(200)
	        .send(`Updated ratio ${ratio} on day ${date} in base ${baseId}`);		
      	}
      }
      
		} 
	);
};

const getWorkingEmpsAbsChildren = (request, response) => {
  const date = request.params.date;
  db.query(
    `
		SELECT res.base_id, count(res.employee_id), ac.children, base.ratio
		FROM 
			(
			SELECT m.base_id, m.employee_id
			FROM moved_employee m 
			WHERE date = $1
			AND m.employee_id NOT IN 
			(	SELECT employee_id 
				FROM absence_employee
				WHERE date = $1
			)

			UNION
				SELECT e2.base_id, e2.id
			  FROM employee e2 
			  WHERE e2.position = 1
			  AND e2.id NOT IN 
			  (	SELECT employee_id 
			  	FROM moved_employee m
			  	WHERE date = $1
			    UNION 
			    	SELECT employee_id
			    	FROM absence_employee
			    	WHERE date = '2019-03-22'
				)
			) res
		INNER JOIN base
		ON res.base_id = base.id
		INNER JOIN absence_children ac
		ON res.base_id = ac.base_id
		WHERE ac.date = $1
		GROUP BY res.base_id, ac.children, base.ratio;`,
    [date],
    (error, results) => {
      if (error) {
        response.status(404).send("Failed fetching absent employees and absent children");
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAbsentEmployeesPerMonth,
  getWorkingEmpsAbsChildren,
  updateRatio,
  getRatio
};
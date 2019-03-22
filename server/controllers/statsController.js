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
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
/*
SELECT res.base_id, count(res.employee_id), ac.children, base.ratio
	FROM 
		(
		SELECT m.base_id, m.employee_id
		FROM moved_employee m 
		WHERE date = '2019-03-22'
		AND m.employee_id NOT IN 
		(	SELECT employee_id 
			FROM absence_employee
			WHERE date = '2019-03-22'
		)

		UNION
			SELECT e2.base_id, e2.id
		  FROM employee e2 
		  WHERE e2.position = 1
		  AND e2.id NOT IN 
		  (	SELECT employee_id 
		  	FROM moved_employee m
		  	WHERE date = '2019-03-22'
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
	WHERE ac.date = '2019-03-22'
	GROUP BY res.base_id, ac.children, base.ratio;
*/
module.exports = {
  getAbsentEmployeesPerMonth,
  getWorkingEmpsAbsChildren
};

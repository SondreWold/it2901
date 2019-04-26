const Pool = require("pg").Pool;
const connection = new Pool({
  user: "uctaqzsivbfvuo",
  host: "ec2-54-246-92-116.eu-west-1.compute.amazonaws.com",
  database: "dcbvh9m94rcn",
  password: "f13a82eda5cc512d6e6b8ff7bcaec34fa19cfa00ffba721806dc17147a1dde54",
  port: 5432,
  ssl: true,
  multipleStatements: true
});

module.exports = connection;
const Pool = require("pg").Pool;
const connection = new Pool({
  user: "yowijmaweckjjw",
  host: "ec2-54-228-224-37.eu-west-1.compute.amazonaws.com",
  database: "d41s9gog2gcj1l",
  password: "41beb6107ec8732b4fbfcc6ca411a353dc35c898c0f35ab93f2eefe260b2f5ab",
  port: 5432,
  ssl: true
});

module.exports = connection;

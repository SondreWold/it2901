import employeeRouter from "./routes/employeeRouter.js";
import baseRouter from "./routes/baseRouter.js";
import houseRouter from "./routes/houseRouter.js";
import unitRouter from "./routes/unitRouter.js";
import absenceRouter from "./routes/absenceRouter.js";
import movedRouter from "./routes/movedRouter.js";
const express = require("express");
const path = require("path");
const app = express();
const db = require("./server/ExampleQueries");
const bodyParser = require("body-parser");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Example for testing connection with ease
app.get("/test", db.getEmployees);

//End-points ** USE THIS PATTERN FOR GENERATING NEW ROUTERS **
app.use("/api/employee", employeeRouter);
app.use("/api/base", baseRouter);
app.use("/api/house", houseRouter);
app.use("/api/unit", unitRouter);
app.use("/api/absence", absenceRouter);
app.use("/api/moved", movedRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express listening on port ${port}`);

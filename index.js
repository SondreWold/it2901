var employeeRouter = require("./routes/employeeRouter");
var baseRouter = require("./routes/baseRouter");
var houseRouter = require("./routes/houseRouter");
var unitRouter = require("./routes/unitRouter");
var absenceRouter = require("./routes/absenceRouter");
var movedRouter = require("./routes/movedRouter");
var navigationRouter = require("./routes/navigationRouter");
var dateRouter = require("./routes/dateRouter");
var statsRouter = require("./routes/statsRouter");
var settingsRouter = require("./routes/settingsRouter");

const express = require("express");
const path = require("path");
const app = express();
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

//End-points ** USE THIS PATTERN FOR GENERATING NEW ROUTERS **
app.use("/api/employee", employeeRouter);
app.use("/api/base", baseRouter);
app.use("/api/house", houseRouter);
app.use("/api/unit", unitRouter);
app.use("/api/absence", absenceRouter);
app.use("/api/moved", movedRouter);
app.use("/api/navigation", navigationRouter);
app.use("/api/minDate", dateRouter);
app.use("/api/stats", statsRouter);
app.use("/api/settings", settingsRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
var server = app.listen(port);

console.log(`Express listening on port ${port}`);

module.exports = server;

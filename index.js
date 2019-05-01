const employeeRouter = require("./routes/employeeRouter");
const baseRouter = require("./routes/baseRouter");
const houseRouter = require("./routes/houseRouter");
const unitRouter = require("./routes/unitRouter");
const absenceRouter = require("./routes/absenceRouter");
const movedRouter = require("./routes/movedRouter");
const navigationRouter = require("./routes/navigationRouter");
const dateRouter = require("./routes/dateRouter");
const statsRouter = require("./routes/statsRouter");
const settingsRouter = require("./routes/settingsRouter");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API end-points
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
// match one of the above, send back the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
const server = app.listen(port);

console.log(`Express listening on port ${port}`);

module.exports = server;

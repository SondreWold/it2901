import empRouter from "./routes/employeeRouter.js";
const express = require("express");
const path = require("path");
const app = express();
const db = require("./server/ExampleQueries");

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

//Example
app.get("/test", db.getEmployees);

//End-points
app.get("/api", empRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express listening on port ${port}`);

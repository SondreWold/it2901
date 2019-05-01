/*

 	Boot script for ES6

*/
// ./express-server/app_hooked.js
require("babel-register")({
  presets: ["es2015-node6"]
});
require("./index.js");

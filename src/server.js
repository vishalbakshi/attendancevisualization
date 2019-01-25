const express = require("express");
const dotenv = require("dotenv");

// Setup the basic objects
dotenv.config();
const app = express();

app.route("/").get(function(req, res) {
  res.send("Hello!");
});

const server = app.listen(8080, function() {
  console.log("express listening on 8080");
});

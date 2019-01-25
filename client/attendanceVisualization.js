// This is where the d3 stuff happens
const d3 = require("d3");
const fetch = require("node-fetch");

d3.csv("data.txt", function(data) {
  console.log(typeof data);
});

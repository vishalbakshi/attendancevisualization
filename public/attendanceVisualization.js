// This is where the d3 stuff happens
const svg = d3.select("body").append("svg");

d3.csv("data.txt", function(data) {
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d, i) => d);
});

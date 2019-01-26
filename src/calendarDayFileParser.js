let chunkData = "";
let headers;
let calendarDayData = {};

let monthDateRange = {
  M1A: { start: "07/23/18", end: "08/17/18" },
  M1B: { start: "08/20/18", end: "09/14/18" },
  M02: { start: "09/17/18", end: "10/12/18" },
  M03: { start: "10/15/18", end: "11/09/18" },
  M04: { start: "11/12/18", end: "12/07/18" },
  M05: { start: "12/10/18", end: "01/04/19" },
  M06: { start: "01/07/19", end: "02/01/19" },
  M07: { start: "02/04/19", end: "03/01/19" },
  M08: { start: "03/04/19", end: "03/29/19" },
  M09: { start: "04/01/19", end: "04/26/19" },
  M10: { start: "04/29/19", end: "05/24/19" },
  M11: { start: "05/27/19", end: "06/21/19" }
};

function getCalendarData(dataFileStream, cb) {
  dataFileStream
    .on("data", function(chunk) {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log("Error in parsing calendar day data: " + err);
      } else {
        let dataLines = chunkData.toString().split("\r");
        dataLines.forEach(function(line) {
          let values = line.split("\t");
          if (values.includes("Date")) {
            headers = values;
          } else {
            values.forEach(function(el, idx) {
              el = el.replace('"', "");
              el = el.replace('"', "");
              if (!calendarDayData.hasOwnProperty(idx)) {
                calendarDayData[idx] = [el];
              } else {
                calendarDayData[idx].push(el);
              }
            });
          }
        });
        for (let key in calendarDayData) {
          console.log(key, calendarDayData[key].length);
        }
        console.log("Done reading file in calendarDayFileParser.js");
      }
    });
}

module.exports = getCalendarData;

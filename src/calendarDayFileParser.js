// calendarDayFileParser.js

/*

The purpose of this module is to parse a DDE file from PowerSchool which contains
the following export field list with Calendar_Day (51) as the current table:

  A
  B
  Bell_Schedule_ID
  C
  Cycle_Day_ID
  D
  Date
  E
  F
  ID
  InSession
  MembershipValue
  Note
  ScheduleID
  SchoolID
  Type
  Week_Num

*/

const fs = require("fs");

let chunkData = "";
let headers;
let calendarDayData = {};

let calendarDayDataFileStream = fs.createReadStream(
  "./public/calendar_day.txt"
);



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


let getCalendarData = new Promise(function(resolve, reject){
  calendarDayDataFileStream
    .on('error', function(err){
      reject(err);
    })
    .on("data", function(chunk) {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log("Error in parsing calendar day data: " + err);
      } else {

        // Convert Buffer to an Array of strings
        let dataLines = chunkData.toString().split("\r");

        dataLines.forEach(function(line) {

          // Convert each row into an Array
          let values = line.split("\t");

          // Extract the headers
          if (values.includes("Date")) {
            headers = values;
          } else {
            values.forEach(function(el, idx) {

              // Remove the double quotes from PS export
              el = el.replace('"', "");
              el = el.replace('"', "");

              // Assign field to corresponding key
              // Use headers as keys
              if (!calendarDayData.hasOwnProperty(headers[idx])) {
                calendarDayData[headers[idx]] = [el];
              } else {
                calendarDayData[headers[idx]].push(el);
              }
            });
          }
        });

        console.log("Done reading file in calendarDayFileParser.js");
        
        // Send the calendarDayData object back
        resolve(calendarDayData);
      }
    });
})


/*
function getCalendarData(dataFileStream, cb) {
  dataFileStream
    .on("data", function(chunk) {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log("Error in parsing calendar day data: " + err);
      } else {

        // Convert Buffer to an Array of strings
        let dataLines = chunkData.toString().split("\r");

        dataLines.forEach(function(line) {

          // Convert each row into an Array
          let values = line.split("\t");

          // Extract the headers
          if (values.includes("Date")) {
            headers = values;
          } else {
            values.forEach(function(el, idx) {

              // Remove the double quotes from PS export
              el = el.replace('"', "");
              el = el.replace('"', "");

              // Assign field to corresponding key
              // Use headers as keys
              if (!calendarDayData.hasOwnProperty(idx)) {
                calendarDayData[headers[idx]] = [el];
              } else {
                calendarDayData[headers[idx]].push(el);
              }
            });
          }
        });

        console.log("Done reading file in calendarDayFileParser.js");

        // Send the calendarDayData object back
        cb(calendarDayData);
      }
    });
}
*/
module.exports = getCalendarData;

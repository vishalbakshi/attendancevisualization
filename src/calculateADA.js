'use strict'

// calculateADA.js

/*

The purpose of this module is to calculate ADA by month and grade level using the 
promises from attendanceFileParser.js and calendarDayFileParser.js

The following definitions are from PowerSchool:

 *Instructional Days: In-session days in reporting date range

 *Carry Fwd: enrollment count of students that were carried over from the
 previous month

 *Gain: number of students who newly enrolled during time period

 *Loss: number of students who unenrolled during the time period

 *Ending: enrollment count present on final day of the reporting period

 *Actual Days: the number of days in attendance = (Carry Fwd + Gain) * School Days

 *Days N/E: Number of days student was not enrolled in reporting period

 *Days Absent: the number of days student was absent during reporting period

 *Days Attd: days a student is present during reporting period
 = Actual Days - (Off Track + Inelegible Days + Days N/E + Days Absent)

 * ADA: Days attended divided by number of instructional days in the
 reporting period

 ADA%: Days Attd / (Actual Days - Off Track - Days N/E - Days Ineligible)

*/

// TODO: user can input date ranges for their particular school
// keys are the month names
// values are start and end dates for the month

let monthDateRange = {
  M1A: { start: "07/23/18", end: "08/17/18", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M1B: { start: "08/20/18", end: "09/14/18", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M02: { start: "09/17/18", end: "10/12/18", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M03: { start: "10/15/18", end: "11/09/18", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M04: { start: "11/12/18", end: "12/07/18", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M05: { start: "12/10/18", end: "01/04/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M06: { start: "01/07/19", end: "02/01/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M07: { start: "02/04/19", end: "03/01/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M08: { start: "03/04/19", end: "03/29/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M09: { start: "04/01/19", end: "04/26/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M10: { start: "04/29/19", end: "05/24/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 },
  M11: { start: "05/27/19", end: "06/21/19", count: 0, carryFwd: 0, gain: 0, loss: 0, ending: 0, actualDays: 0, daysNE: 0, daysAbsent: 0, daysAttd: 0, ADA: 0, ADApercent: 0 }
};

let getData = function(attendancePromise, calendarPromise) {
  return new Promise(function(fulfill, reject) {
    let counter = 0;
    let resolvedArray = [];

    attendancePromise.then(function(result) {
      resolvedArray.push(result);
      counter++;
      if (counter == 2) {
        fulfill(resolvedArray);
      };
    }).catch(console.error);

    calendarPromise.then(function(result) {
      resolvedArray.push(result);
      counter++;
      if (counter == 2) {
        fulfill(resolvedArray);
      };
    }).catch(function(err){
      reject(err);
    });
  });
};

let calculateADA = function(attendancePromise, calendarPromise){
  let data = getData(attendancePromise, calendarPromise);
  data.then(function(attendanceAndCalendarData){
    //console.log(Object.keys(attendanceAndCalendarData[0]));
    //console.log(Object.keys(attendanceAndCalendarData[1]));

    // Let's get the number of days in each month
    attendanceAndCalendarData[0]['Date'].forEach(function(date, index){
      // If it's an in-session day, see what month it's in and increment
      // that month's day count

        let calendarDate = new Date(date);

        if (attendanceAndCalendarData[0]['InSession'][index] == '1') {
          for (let key in monthDateRange) {
            let monthDate = new Date(monthDateRange[key].end);
            if (calendarDate <= monthDate) {
              monthDateRange[key].count++;
              break;
            }
          }
        }
    })

    // Let's assign the month name to each attendance record so we can 
    // later group by it

    attendanceAndCalendarData[1]['Month'] = [];

    attendanceAndCalendarData[1]['Att_Date'].forEach(function(date, index){
      let attDate = new Date(date);
      
      for (let key in monthDateRange) {
        let monthDate = new Date(monthDateRange[key].end);
        if (attDate <= monthDate) {
          attendanceAndCalendarData[1]['Month'][index] = key;
          break;
        }
      }
    })

    // Let's get the Gain and Loss counts for each month from the EntryDate
    // and ExitDate, respectively

    // initialize vars used in getting Gain counts
    let gainStudentNumbers = [];
    let gainCurrentStudentNumber;
    let gainAttDate;
    let gainMonthDate;

    attendanceAndCalendarData[1]['[1]EntryDate'].forEach(function(date, index){
      gainAttDate = new Date(date);

      // Get the student number associated with the current attendance record
      gainCurrentStudentNumber = attendanceAndCalendarData[1]['[1]Student_number'][index];

      if (!gainStudentNumbers.includes(gainCurrentStudentNumber)) {
        for (let key in monthDateRange) {
          gainMonthDate = new Date(monthDateRange[key].end);
          if (gainAttDate <= gainMonthDate) {
            monthDateRange[key].gain++;
            gainStudentNumbers.push(gainCurrentStudentNumber);
            break;
          }
        }
      }
    });

    // initialize vars used in getting Loss counts
    let lossStudentNumbers = [];
    let lossCurrentStudentNumber;
    let lossAttDate;
    let lossMonthDate;

    attendanceAndCalendarData[1]['[1]ExitDate'].forEach(function(date, index){
      lossAttDate = new Date(date);

      // Get the student number associated with the current attendance record
      lossCurrentStudentNumber = attendanceAndCalendarData[1]['[1]Student_number'][index];

      if (!lossStudentNumbers.includes(lossCurrentStudentNumber)) {
        for (let key in monthDateRange) {
          lossMonthDate = new Date(monthDateRange[key].end);
          if (lossAttDate <= lossMonthDate) {
            monthDateRange[key].loss++;
            lossStudentNumbers.push(lossCurrentStudentNumber);
            break;
          }
        }
      }
    });


    // Let's set the ending counts

    // initialize the vars that will be used in getting ending and carryFwd counts
    let sortedMonths = ['M1A', 'M1B', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11'];
    let currentMonthSortedIndex;
    let previousMonthSortedIndex;

    for (let key in monthDateRange) {
      currentMonthSortedIndex = sortedMonths.indexOf(key);
      if (currentMonthSortedIndex == 0) {
        monthDateRange[key].ending = monthDateRange[key].gain - monthDateRange[key].loss;
      } else {
        previousMonthSortedIndex = currentMonthSortedIndex - 1;
        monthDateRange[key].ending = 
          monthDateRange[sortedMonths[previousMonthSortedIndex]].ending +
          monthDateRange[key].gain - 
          monthDateRange[key].loss;
      }
    }


    // Let's set the carryFwd counts

    for (let key in monthDateRange){
      currentMonthSortedIndex = sortedMonths.indexOf(key);
      if (currentMonthSortedIndex != 0) {
        previousMonthSortedIndex = currentMonthSortedIndex - 1;
        monthDateRange[key].carryFwd = monthDateRange[sortedMonths[previousMonthSortedIndex]].ending;
      }
    }

    // Let's set the actualDays

    for (let key in monthDateRange) {
      monthDateRange[key].actualDays = 
        ( monthDateRange[key].carryFwd + monthDateRange[key].gain ) *
        monthDateRange[key].count;
    }

    // Let's set the daysNE    
    // initialize vars used in getting Loss counts

    let daysNEStudentNumbers = [];
    let daysNECurrentStudentNumber;
    let daysNEExitDate;
    let daysNEMonthDate;
    let daysNE;

    attendanceAndCalendarData[1]['[1]ExitDate'].forEach(function(date, index){
      daysNEExitDate = new Date(date);
      
      // Get the student number associated with the current attendance record
      daysNECurrentStudentNumber = attendanceAndCalendarData[1]['[1]Student_number'][index];

      if (!daysNEStudentNumbers.includes(daysNECurrentStudentNumber)) {
        for (let key in monthDateRange) {
          daysNEMonthDate = new Date(monthDateRange[key].end);
          if (daysNEExitDate <= daysNEMonthDate) {
            daysNE = Math.round((daysNEMonthDate - daysNEExitDate) / 86400000.0);
            monthDateRange[key].daysNE += daysNE;
          }
        }
      }
    });

    // Let's calculate the daysAbsent

    // initialize vars used in getting daysAbsent counts
    let daysAbsentMonthName;

    attendanceAndCalendarData[1]['[156]Presence_Status_CD'].forEach(function(status, index){
      if (status == 'Absent') {
        daysAbsentMonthName = attendanceAndCalendarData[1]['Month'][index];
        monthDateRange[daysAbsentMonthName].daysAbsent++;
      }
    });

    // Let's calculate daysAttd

    // initialize vars used in getting daysAttd counts

    for (let key in monthDateRange) {
      monthDateRange[key].daysAttd = 
        monthDateRange[key].actualDays - 
        ( monthDateRange[key].daysNE + monthDateRange[key].daysAbsent);
    }


    // Let's calculate ADA
    for (let key in monthDateRange) {
      monthDateRange[key].ADA = 
        (monthDateRange[key].daysAttd / monthDateRange[key].count).toFixed(3)
    }

    // Let's calculate ADA Percentage
    for (let key in monthDateRange) {
      (
        monthDateRange[key].ADApercent = 
        monthDateRange[key].daysAttd /
        (
          monthDateRange[key].actualDays - 
          monthDateRange[key].daysNE
        )
      ).toFixed(3);
    }
    console.log(monthDateRange);

  }).catch(console.error)
}


module.exports = calculateADA;

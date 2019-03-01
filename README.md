
# Core Functionality
Users can import attendance data and calculate the ADA value by month for different student population subgroups



## Two Week Version
1. What is the task that is impossible to do manually?
  - This app does not pass this test
2. What is the next most annoying task to do manually?
  - Calculate the ADA for an entire student population for each reporting month

3. What is the next most annoying task to do manually?
  - Calculate the ADA for student subgroups for each reporting month
  
<br>

# Input
This app requires two exports from PowerSchool SIS from the Direct Database Export (DDE).

### Direct Database Export (DDE)
With the Attendance (157) table set as the <em>Current Table</em>, use the following export field list:

<pre>
  [1]Student_number
  [1]ExitDate
  [1]EntryDate
  [156]Att_Code
  [156]Description
  [156]Presence_Status_CD
  Att_Date
  [138]Name
  [4]TeacherID
  Att_Mode_Code
</pre>

With the Calendar_Day (51) table set as the <em>Current Table</em>, use the following export field list:

<pre>
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
</pre>


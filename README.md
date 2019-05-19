# Checklist App

Features
1.	Login
2.	Logout
3.	Add checklist without schedule
4.	Add recurring checklist
5.	Maximum 100 users
6.	Maximum 100KB data of checklist
7.	History of previous checklist
8.	Recurring notifications

JSON structure: An object with sequence id, checklist text. An array of this object will be part of another object. This parent object must also contain another object for recurring information. Recurring information includes one object for schedule and a flag which can be true if user wants to see notifications based on the schedule.
Tasks
Prepare a JSON structure – DONE

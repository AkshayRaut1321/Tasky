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
1.	Prepare a JSON structure – DONE
2.	Add a layout to show Notes - DONE
3.	Option to add new Notes – DONE
4.	Option to convert Note to Checklist and back 
5.	Add schedule for notes
6.	Search feature
7.	Delete feature
8.	History of notes
9.	Login and logout
10.	Log history of checklist in JSON files.
11.	Maximum a yearly data of checklist

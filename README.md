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
4.	Option to add checklist - DONE
5.	Option to convert Note to Checklist and back 
6.	Add schedule for notes
7.	Search feature
8.	Delete feature
9.	History of notes
10.	Login and logout
11.	Log history of checklist in JSON files.
12.	Maximum a yearly data of checklist
13.	Disable text copy and paste from saved notes unless user clicks on them.
14.	Selection of notes
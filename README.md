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
5.	Option to convert Note to Checklist and back - In process
6.	User should be able to add checkbox between items - DONE
7.	If a new checkbox item is added in middle then set focus on that - DONE
8.	Add schedule for notes
9.	Search feature
10.	Delete feature
11.	History of notes
12.	Login and logout
13.	Log history of checklist in JSON files.
14.	Maximum a yearly data of checklist
15.	Disable text copy and paste from saved notes unless user clicks on them.
16.	Selection of notes
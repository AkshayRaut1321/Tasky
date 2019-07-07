import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from '../../models/Note';
import { BaseNote } from '../../models/BaseNote';
import { CheckList } from '../../models/CheckList';
import { ListItem } from '../../models/ListItem';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { isNullOrUndefined } from 'util';
import { DateService } from 'src/app/services/date-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: BaseNote[];
  newChecklistItemIdKey = 'newChecklistText';
  newChecklistBoxIdKey = 'newChecklistBox';
  hasTextLocal = StringHelperService.hasText;
  isScheduleValid = false;

  @ViewChild('title', { static : true }) newTitle: ElementRef;
  @ViewChild('text', { static : true }) newText: ElementRef;
  @ViewChild('divNewChecklist', { static : true }) divNewChecklist: ElementRef;

  constructor() {

  }

  ngOnInit(): void {
    this.notes = [];

    let textNote = new Note();
    textNote.id = 1;
    textNote.title = 'Diary';
    textNote.text = 'This is my second application and I am trying to make an useful checklist. Try adding one of your own.';

    this.notes.push(textNote);

    let checkItem1 = new ListItem();
    checkItem1.id = 1;
    checkItem1.text = 'Build Tasky app';
    checkItem1.checked = true;

    let newChecklistItem = new ListItem();
    newChecklistItem.id = 2;
    newChecklistItem.text = 'Deploy Task app';
    newChecklistItem.checked = false;

    let checkList = new CheckList();
    checkList.id = 2;
    checkList.title = 'Tasks for today';
    checkList.items = new Array();

    checkList.items.push(checkItem1);
    checkList.items.push(newChecklistItem);

    this.notes.push(checkList);

    this.notes.push(textNote);
    this.notes.push(checkList);
  }

  getMaxNoteId(): number {
    return this.notes.length == 0 ? 0 : Math.max.apply(Math, this.notes.map(function (o) { return o.id; }));
  }

  editorClosed() {
  }

  saveNote(note: BaseNote) {
    if (note instanceof Note) {
      let newNote = note as Note;
      newNote.id = this.getMaxNoteId() + 1;
      this.notes.splice(0, 0, newNote);
    }
    else if (note instanceof CheckList) {
      let newChecklist = note as CheckList;
      let checklist = Object.assign({}, newChecklist);
      checklist.title = newChecklist.title;
      this.notes.splice(0, 0, checklist);
    }
  }

  trackByItems(index: number, item: ListItem): number {
    return item.id;
  };

  deleteNote(note: BaseNote) {
    if (!isNullOrUndefined(note)) {
      this.notes.splice(this.notes.indexOf(note), 1);
    }
  }

  hasChecklistItems(note: CheckList) {
    return note.items ? note.items.length > 0 : false;
  }

  isScheduleAssigned(note: BaseNote): boolean {
    return !isNullOrUndefined(note.schedule);
  }

  nextSchedule(note: BaseNote): string {
    let message: string;
    if (!isNullOrUndefined(note.schedule)) {
      let currentDate = new Date();
      const dateDiff = note.schedule.startDate.valueOf() - currentDate.valueOf();
      const scheduledYear = note.schedule.startDate.getFullYear();
      const scheduledMonth = note.schedule.startDate.getMonth();
      const scheduledDate = note.schedule.startDate.getDate();
      const scheduledHour = note.schedule.startDate.getHours();
      const scheduledMinute = note.schedule.startDate.getMinutes();
      const scheduleTime = note.schedule.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      if (dateDiff != 0) {
        if (scheduledYear <= currentDate.getFullYear() && scheduledMonth <= currentDate.getMonth() && scheduledDate <= currentDate.getDate()
          && scheduledHour <= currentDate.getHours() && scheduledMinute < currentDate.getMinutes()) {
          message = "Today " + scheduleTime;
          this.isScheduleValid = false;
          return;
        }
        else if (scheduledYear > currentDate.getFullYear()) {
          console.log('year');
          message = scheduledYear.toString() + " " + DateService.monthNames[scheduledMonth] + " "
            + scheduledDate.toString() + " " + scheduleTime
        }
        else if (scheduledMonth > currentDate.getMonth()) {
          console.log('month');
          message = DateService.monthNames[scheduledMonth] + " "
            + scheduledDate.toString() + " " + scheduleTime;
        }
        else if (scheduledDate > currentDate.getDate()) {
          console.log('day');
          message = scheduleTime;
          if ((scheduledDate - currentDate.getDate()) == 1)
            message = "Tomorrow " + message;
          else
            message = DateService.monthNames[scheduledMonth] + " " + scheduledDate.toString() + " " + message;
        }
        else if (scheduledDate == currentDate.getDate()) {
          console.log('today');
          message = "Today " + scheduleTime;
        }
        this.isScheduleValid = true;
      }
    }
    return message;
  }
}
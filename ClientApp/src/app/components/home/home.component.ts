import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from '../../models/Note';
import { BaseNote } from '../../models/BaseNote';
import { CheckList } from '../../models/CheckList';
import { ListItem } from '../../models/ListItem';
import { StringHelperService } from 'src/app/services/string-helper.service';

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
  isScheduleVisible = false;
  showReminder = false;
  showDateTimePicker = false;
  showRepeater = false;

  @ViewChild('title') newTitle: ElementRef;
  @ViewChild('text') newText: ElementRef;
  @ViewChild('divNewChecklist') divNewChecklist: ElementRef;
  @ViewChild('dropDownSchedule') dropDownSchedule: ElementRef;

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

  clickedOutsideEditor() {
    this.isScheduleVisible = false;
  }

  saveNote(note: BaseNote) {
    if (note instanceof Note) {
      let newNote = note as Note;
      newNote.id = this.getMaxNoteId() + 1;
      this.notes.push(newNote);
    }
    else if (note instanceof CheckList) {
      let newChecklist = note as CheckList;
      let checklist = Object.assign({}, newChecklist);
      checklist.title = newChecklist.title;
      this.notes.push(checklist);
    }
    this.isScheduleVisible = false;
  }

  showSchedule(calendarElement: HTMLElement) {
    this.isScheduleVisible = !this.isScheduleVisible;
    this.openReminder();
    if (this.isScheduleVisible) {
      calendarElement.parentElement.insertAdjacentElement("afterend", this.dropDownSchedule.nativeElement);
    }
  }

  openReminder() {
    this.showReminder = true;
    this.showDateTimePicker = false;
    this.showRepeater = false;
  }

  openDateTimePicker() {
    this.showReminder = false;
    this.showDateTimePicker = true;
    this.showRepeater = false;
  }

  openScheduleRepeater() {
    this.showReminder = false;
    this.showDateTimePicker = false;
    this.showRepeater = true;
  }
}
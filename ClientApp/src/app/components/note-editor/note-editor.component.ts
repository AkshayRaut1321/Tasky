import { Component, OnInit, Renderer2, ViewChild, ElementRef, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { CheckList } from 'src/app/models/CheckList';
import { isNullOrUndefined } from 'util';
import { ListItem } from 'src/app/models/ListItem';
import { Note } from 'src/app/models/Note';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRepeater } from 'src/app/models/ScheduleRepeater';
import { ScheduleNotification } from 'src/app/models/ScheduleNotification';
import { Schedule } from 'src/app/models/Schedule';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { DateService } from 'src/app/services/date-service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'tasky-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnInit {
  editMode = false;
  newChecklist: CheckList;
  checkBoxMode = false;
  isScheduleVisible = false;
  scheduleClicked: boolean;
  selectedSchedule: Schedule;
  selectedScheduleDate: NgbDate;
  selectedScheduleTime: NgbTime;
  selectedScheduleRepeat: ScheduleRepeater;
  message: string;
  isScheduleValid: boolean;
  watchScheduleValidity: Subscription;

  @Output() editorClosed = new EventEmitter();
  @Output() editComplete = new EventEmitter();
  @ViewChild('divNewNote') divNewNote: ElementRef;
  @ViewChild('calendarIcon') calendarIcon: ElementRef;
  @ViewChildren('checkBoxes') checkBoxes: QueryList<ElementRef<HTMLElement>>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.resetChecklist();
    this.watchScheduleValidity = interval(1000).subscribe((data) => {
      this.nextSchedule();
    });
  }

  open() {
    if (!this.editMode) {
      this.editMode = true;
      this.setFocus('#newText');
    }
  }

  close(event: FocusEvent, title: HTMLInputElement) {
    if (this.scheduleClicked) {
      this.scheduleClicked = false;
      return;
    }

    if (this.editMode) {
      let text = this.renderer.selectRootElement('#newText');
      if (text instanceof HTMLTextAreaElement) {
        var textArea = text as HTMLTextAreaElement;
        if (StringHelperService.hasText(textArea.value)) {
          let newNote = new Note();
          newNote.text = textArea.value;
          newNote.title = title.value;
          this.editComplete.emit(newNote);
        }
        textArea.value = "";
        textArea.rows = 1;
      }
      else if (text instanceof HTMLInputElement) {
        var inputText = text as HTMLInputElement;
        if (StringHelperService.hasText(inputText.value))
          this.saveChecklistItem(inputText.value);
        if (this.hasChecklistItems()) {
          this.newChecklist.title = title.value;
          this.editComplete.emit(this.newChecklist);
        }
        this.resetChecklist();
        inputText.value = "";
      }
      title.value = "";
      this.editMode = false;
    }
    this.editorClosed.emit();
  }

  hasChecklistItems() {
    return this.newChecklist.items.length > 0;
  }

  typed(event: KeyboardEvent, text: HTMLElement) {
    if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
      console.log(event);
      return false;
    }

    if (text instanceof HTMLTextAreaElement) {
      if (event.keyCode === 13)
        text.rows++;
      else if (event.keyCode === 8) {
        let matchedLineBreak = RegExp(/\r\n|\r|\n/).exec(text.value[text.value.length - 1]);
        if (!isNullOrUndefined(matchedLineBreak)) {
          let totalNewLines = text.value.split(/\r\n|\r|\n/).length;
          text.rows = totalNewLines > 1 ? totalNewLines - 1 : 1;
        }
      }
    }
    else if (text instanceof HTMLInputElement) {
      if (event.keyCode === 13) {
        if (StringHelperService.hasText(text.value)) {
          this.saveChecklistItem(text.value);
          text.value = '';
        }
      }
    }
  }

  editExistingChecklist(event: KeyboardEvent, checklistItem: ListItem, checklistItemElement: HTMLInputElement) {
    if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
      console.log(event);
      return false;
    }
    if (event.keyCode === 13 && !isNullOrUndefined(checklistItem)) {
      let existingChecklistItemIndex = this.newChecklist.items.indexOf(checklistItem);
      let newChecklistItem = new ListItem();
      newChecklistItem.id = Infinity;
      newChecklistItem.text = '';
      newChecklistItem.checked = false;
      this.newChecklist.items.splice(existingChecklistItemIndex + 1, 0, newChecklistItem);
      setTimeout(() => {
        var data = this.checkBoxes.toArray();
        let nextFocusEl = data[existingChecklistItemIndex + 1];
        (nextFocusEl.nativeElement.firstChild.nextSibling as HTMLElement).focus();
      }, 1);
    }
  }

  changeEditorMode() {
    this.checkBoxMode = !this.checkBoxMode;
    this.convertEditor();
  }

  saveChecklistItem(checkBoxText: string) {
    let newChecklistItem = new ListItem();
    newChecklistItem.id = this.getMaxChecklistItemId(this.newChecklist) + 1;
    newChecklistItem.text = checkBoxText;
    newChecklistItem.checked = false;
    this.newChecklist.items.push(newChecklistItem);
  }

  resetChecklist() {
    this.newChecklist = new CheckList();
    this.newChecklist.items = [];
  }

  convertEditor() {
    if (this.checkBoxMode) {
      let textArea = this.renderer.selectRootElement('#newText') as HTMLTextAreaElement;
      let textArray = textArea.value.split(/\r\n|\r|\n/);
      textArray.forEach(element => {
        if (StringHelperService.hasText(element))
          this.saveChecklistItem(element);
      });
    } else {
      let textInput = this.renderer.selectRootElement('#newText') as HTMLInputElement;
      let plainText = "";

      this.newChecklist.items.forEach(checklistItem => {
        plainText += (StringHelperService.hasText(plainText) ? "\r\n" : "") + checklistItem.text;
      });
      this.resetChecklist();

      if (StringHelperService.hasText(textInput.value))
        plainText += (StringHelperService.hasText(plainText) ? "\r\n" : "") + textInput.value;

      setTimeout(() => {
        let totalNewLines = plainText.split(/\r\n|\r|\n/).length;
        let textArea = this.renderer.selectRootElement('#newText') as HTMLTextAreaElement;
        textArea.value = plainText;
        textArea.rows = totalNewLines > 1 ? totalNewLines : 1;
      }, 0);
    }
    this.open();
    this.setFocus('#newText');
  }

  setFocus(selector: string) {
    setTimeout(() => {
      const element = this.renderer.selectRootElement(selector);
      element.focus();
    }, 1);
  }

  getMaxChecklistItemId(checklist: CheckList): number {
    return checklist.items.length == 0 ? 0 : Math.max.apply(Math, checklist.items.map(function (o) { return o.id; }));
  }

  showSchedule() {
    this.isScheduleVisible = true;
  }

  deleteChecklistItem(item: ListItem) {
    setTimeout(() => {
      this.newChecklist.items.splice(this.newChecklist.items.indexOf(item), 1);
    }, 0);
  }

  scheduleChanged(isChanged: boolean) {
    this.scheduleClicked = isChanged;
  }

  saveSchedule(schedule: ScheduleNotification) {
    this.selectedSchedule = new Schedule();
    this.selectedScheduleDate = schedule.Date;
    this.selectedScheduleTime = schedule.Time;
    this.selectedScheduleRepeat = schedule.Repeat;
    this.selectedSchedule.startDate = new Date(schedule.Date.year, schedule.Date.month - 1, schedule.Date.day,
      schedule.Time.hour, schedule.Time.minute);
    this.selectedSchedule.repeat = schedule.Repeat;
    this.isScheduleVisible = false;
    this.nextSchedule();
  }

  isScheduleAssigned(): boolean {
    return this.selectedSchedule != null && this.selectedSchedule != undefined;
  }

  nextSchedule() {
    if (!isNullOrUndefined(this.selectedSchedule)) {
      let currentDate = new Date();
      const dateDiff = (this.selectedSchedule.startDate as any) - (currentDate as any);
      const scheduledYear = this.selectedSchedule.startDate.getFullYear();
      const scheduledMonth = this.selectedSchedule.startDate.getMonth();
      const scheduledDate = this.selectedSchedule.startDate.getDate();
      const scheduledHour = this.selectedSchedule.startDate.getHours();
      const scheduledMinute = this.selectedSchedule.startDate.getMinutes();
      const scheduleTime = this.selectedSchedule.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      if (dateDiff != 0) {
        if (scheduledYear > currentDate.getFullYear()) {
          console.log('year');
          this.message = scheduledYear.toString() + " " + DateService.monthNames[scheduledMonth] + " "
            + scheduledDate.toString() + " " + scheduleTime
        }
        else if (scheduledMonth > currentDate.getMonth()) {
          console.log('month');
          this.message = DateService.monthNames[scheduledMonth] + " "
            + scheduledDate.toString() + " " + scheduleTime;
        }
        else if (scheduledDate > currentDate.getDate()) {
          console.log('day');
          this.message = scheduleTime;
          if ((scheduledDate - currentDate.getDate()) == 1)
            this.message = "Tomorrow " + this.message;
          else
            this.message = DateService.monthNames[scheduledMonth] + " " + scheduledDate.toString() + " " + this.message;
        }
        else if (scheduledYear == currentDate.getFullYear() && scheduledMonth == currentDate.getMonth() && scheduledDate == currentDate.getDate()
          && scheduledHour == currentDate.getHours() && (scheduledMinute == currentDate.getMinutes() || scheduledMinute <= currentDate.getMinutes())) {
          this.message = "Today " + scheduleTime;
          this.isScheduleValid = false;
          this.watchScheduleValidity.remove(this.watchScheduleValidity);
          return;
        }
        else if (scheduledDate == currentDate.getDate()) {
          console.log('today');
          this.message = "Today " + scheduleTime;
        }
        this.isScheduleValid = true;
      }
    }
  }
}

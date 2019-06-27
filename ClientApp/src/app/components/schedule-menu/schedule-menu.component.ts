import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbInputDatepicker, NgbTimeStruct, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRepeater } from 'src/app/models/ScheduleRepeater';
import { ScheduleNotification } from 'src/app/models/ScheduleNotification';
import { isNullOrUndefined } from 'util';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { NgbTimeStructAdapter } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time-adapter';

@Component({
  selector: 'tasky-schedule-menu',
  templateUrl: './schedule-menu.component.html',
  styleUrls: ['./schedule-menu.component.css']
})
export class ScheduleMenuComponent implements OnInit {
  showReminder = true;
  showDateTimePicker = false;
  showRepeater = false;

  repeaters: ScheduleRepeater[];
  scheduledRepeat: ScheduleRepeater;
  scheduledDate: NgbDate;
  scheduledTime: NgbTime;
  minDate: NgbDate;
  startDate: NgbDate;

  @ViewChild('dropDownSchedule') dropDownSchedule: ElementRef;
  @Output() scheduleChanged = new EventEmitter();
  @Output() saveSchedule = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.repeaters = [];
    this.repeaters.push({ id: 0, name: "Does not repeat" });
    this.repeaters.push({ id: 1, name: "Daily" });
    this.repeaters.push({ id: 2, name: "Weekly" });
    this.repeaters.push({ id: 3, name: "Monthly" });
    this.repeaters.push({ id: 4, name: "Yearly" });
    this.repeaters.push({ id: 5, name: "Custom" });
    
    let currentDate = new Date();
    this.minDate = new NgbDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    this.scheduledDate = this.minDate;
    let tempTime = {};
    this.scheduledTime = (tempTime as NgbTime);
    this.scheduledTime.hour = currentDate.getHours();
    this.scheduledTime.minute = currentDate.getMinutes();
    this.onResetFired();

  }

  showSchedule() {
    this.openReminder();
  }

  onResetFired() {
    this.scheduledRepeat = this.repeaters[0];
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

  showDatePicker(d: NgbInputDatepicker) {
    d.toggle();
  }

  scheduleChange() {
    this.scheduleChanged.emit(true);
  }

  save() {
    if (isNullOrUndefined(this.scheduledDate) || isNullOrUndefined(this.scheduledTime))
      return;
    this.saveSchedule.emit(new ScheduleNotification(this.scheduledDate, this.scheduledTime, this.scheduledRepeat));
  }

  datePickerClosed() {
    if (isNullOrUndefined(this.scheduledDate)) {
      let currentDate = new Date();
      this.scheduledDate = new NgbDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    }
  }
}

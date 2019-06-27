import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { ScheduleRepeater } from "./ScheduleRepeater";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";

export class ScheduleNotification {
    constructor(public Date?: NgbDate, public Time?: NgbTime, public Repeat?: ScheduleRepeater) {
    }
}
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { ScheduleRepeater } from "./ScheduleRepeater";

export class ScheduleNotification {
    constructor(public Date?: NgbDate, public Time? : , public Repeat? : ScheduleRepeater){
    }
}
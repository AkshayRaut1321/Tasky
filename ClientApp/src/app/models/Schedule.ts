import { Time } from "@angular/common";
import { Audit } from "./audit";
import { ScheduleRepeater } from "./ScheduleRepeater";

export class Schedule extends Audit {
    days: number[];
    time: Time;
    startDate : Date;
    canNotify: boolean;
    repeat : ScheduleRepeater;
}
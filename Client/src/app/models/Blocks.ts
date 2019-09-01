import { WeekDay } from '@angular/common';

export class Blocks {
    monday: boolean[];
    tuesday: boolean[];
    wednesday: boolean[];
    thursday: boolean[];
    friday: boolean[];
    saturday: boolean[];
}

export class BlockName {
    monday = ['', '', '', '', '', '', '', '', '', '', ''];
    tuesday = ['', '', '', '', '', '', '', '', '', '', ''];
    wednesday = ['', '', '', '', '', '', '', '', '', '', ''];
    thursday = ['', '', '', '', '', '', '', '', '', '', ''];
    friday = ['', '', '', '', '', '', '', '', '', '', ''];
    saturday = ['', '', '', '', '', '', '', '', '', '', ''];

    getListByWeekDay(weekDay: WeekDay): string[] {
        switch (weekDay) {
            case WeekDay.Monday:
                return this.monday;
            case WeekDay.Tuesday:
                return this.tuesday;
            case WeekDay.Wednesday:
                return this.wednesday;
            case WeekDay.Thursday:
                return this.thursday;
            case WeekDay.Friday:
                return this.friday;
            case WeekDay.Saturday:
                return this.saturday;
        }
    }
}

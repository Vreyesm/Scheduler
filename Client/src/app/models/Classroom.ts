import { WeekDay } from '@angular/common';

export class Classroom {
  id: number;
  name: string;
  capacity = 0;
  scheduleId: number;
  buildingId: number;
  available: boolean;
  mondayData = '';
  tuesdayData = '';
  wednesdayData = '';
  thursdayData = '';
  fridayData = '';
  saturdayData = '';

  getListByWeekDay(weekDay: WeekDay): string[] {
    switch (weekDay) {
      case WeekDay.Monday:
        return this.mondayData.split(';');
      case WeekDay.Tuesday:
        return this.tuesdayData.split(';');
      case WeekDay.Wednesday:
        return this.wednesdayData.split(';');
      case WeekDay.Thursday:
        return this.thursdayData.split(';');
      case WeekDay.Friday:
        return this.fridayData.split(';');
      case WeekDay.Saturday:
        return this.saturdayData.split(';');
    }
  }
}

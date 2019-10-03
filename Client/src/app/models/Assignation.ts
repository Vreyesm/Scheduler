import { Classroom } from './Classroom';
import { Section } from './Section';
import { WeekDay } from '@angular/common';

export class Assignation {
    id: number;
    classroomId: number;
    classroom: Classroom;
    section: Section;
    day: WeekDay;
    block: number;
    hasExpiration: boolean;
    expiration: Date;

    constructor() {}
}

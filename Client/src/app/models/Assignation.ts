import { Classroom } from './Classroom';
import { Section } from './Section';
import { WeekDay } from '@angular/common';

export class Assignation {
    id: number;
    classroomId: number;
    section: Section;
    day: WeekDay;
    block: number;
    expiration: Date;

    constructor() {}
}

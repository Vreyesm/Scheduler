import { WeekDay } from '@angular/common';
import { Classroom } from './Classroom';
import { Section } from './Section';

export class AssignationRequest {
    id: number;
    professorId: string;
    section: Section;
    classroom: Classroom;
    day: WeekDay;
    block: number;
    span: number;
    expiration: Date;
    comment: string;
}

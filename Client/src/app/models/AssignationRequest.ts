import { WeekDay } from '@angular/common';
import { Classroom } from './Classroom';
import { Section } from './Section';
import { UserData } from './UserData';

export class AssignationRequest {
    id: number;
    professor: UserData;
    section: Section;
    classroom: Classroom;
    day: WeekDay;
    block: number;
    span: number;
    special: boolean;
    expiration: Date;
    comment: string;
    accepted: boolean;

    available: boolean;
}

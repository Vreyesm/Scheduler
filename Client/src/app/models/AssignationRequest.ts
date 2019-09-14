import { WeekDay } from '@angular/common';

export class AssignationRequest {
    id: number;
    professorId: string;
    sectionId: number;
    classroomId: number;
    day: WeekDay;
    block: number;
    span: number;
    expiration: Date;
    comment: string;
}

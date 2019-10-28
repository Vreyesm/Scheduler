import { UserData } from './UserData';

export class Section {
    id: number;
    name: string;
    students: number;
    professor: UserData;
    professorId: string;
    mondayData = 'false;false;false;false;false;false;false;false;false;false;false';
    tuesdayData = 'false;false;false;false;false;false;false;false;false;false;false';
    wednesdayData = 'false;false;false;false;false;false;false;false;false;false;false';
    thursdayData = 'false;false;false;false;false;false;false;false;false;false;false';
    fridayData = 'false;false;false;false;false;false;false;false;false;false;false';
    saturdayData = 'false;false;false;false;false;false;false;false;false;false;false';
    constructor() {}
}

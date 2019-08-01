import { UserData } from './UserData';

export class Section {
    id: number;
    name: string;
    students: number;
    professor: UserData;
    professorId: string;
    mondayData = '';
    tuesdayData = '';
    wednesdayData = '';
    thursdayData = '';
    fridayData = '';
    saturdayData = '';
    constructor() {}
}

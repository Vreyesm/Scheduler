import { Section } from "./Section";
export class Subject {
    id: number;
    name: string;
    students = 0;
    sections?: Section[];

    constructor() {}
}

export class UserData {
    public id: string;
    public name: string;
    public type: UserType;
    public email: string;
    public password: string;

    constructor() { }
}

export enum UserType {
    Admin = 1,
    Director = 2,
    Professor = 3,
    Student = 4
}

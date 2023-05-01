export interface IUserDisplay {
    email: string;
    firstName: string;
}

export interface IUser extends IUserDisplay{
    password: string;
}

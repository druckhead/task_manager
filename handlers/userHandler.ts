import {IUser} from "../interfaces/users";
import {deleteUser, getUsers, insertNewUser, updateUser} from "../DAL/collections/users/queries";

export const getUsersHandler = async (id?: string) => {
    const dbResult = await getUsers(id);
    const displayedUsers = dbResult;
    console.log(`displayedUsers: ${JSON.stringify(displayedUsers)}`);
    return displayedUsers;
}

export const createUserHandler = async (user: IUser) => {
    const dbResult = await insertNewUser(user);
    console.log(`createUserHandler result is: ${dbResult}`);
    return dbResult;
}

export const updateUserHandler = async (user_id: string, data: Partial<IUser>) => {
    const dbResult = await updateUser(user_id, data);
    console.log(`updateUserHandler result is: ${dbResult}`);
    return dbResult;
}

export const deleteUserHandler = async (user_id: string) => {
    const dbResult = await deleteUser(user_id);
    console.log(`deleteUserHandler result is: ${dbResult}`);
    return dbResult;
}
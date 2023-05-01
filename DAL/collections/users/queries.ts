import {db} from "../../../index";
import {USERS_COLLECTION_NAME} from "./schema";
import {Collection, InsertOneResult, ObjectId} from "mongodb"
import {IUser} from "../../../interfaces/users";

// read
export const getUsers = async (id?: string) => {
    const usersCollection: Collection = db.collection(USERS_COLLECTION_NAME);
    try {
        let result;
        if (id) {
            result = await usersCollection.findOne({_id: new ObjectId(id)});
        } else {
            result = await usersCollection.find().toArray();
        }
        return result;
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`);
        return {success: false, error: error.message};
    }
}

// create
export const insertNewUser = async (user: IUser) => {
    const usersCollection: Collection = db.collection(USERS_COLLECTION_NAME);
    try {
        const result: InsertOneResult = await usersCollection.insertOne(user);
        return {success: true, ...result};
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`);
        return {success: false, error: error.message};
    }
}

// update
export const updateUser = async (user_id: string, data: Partial<IUser>) => {
    const userCollection = db.collection(USERS_COLLECTION_NAME);
    try {
        const result = await userCollection.updateOne(
            {_id: new ObjectId(user_id)},
            {$set: data}
        );
        return result.matchedCount == 1;
    } catch (error: any) {
        console.error(`Error updating User with user_id: ${user_id}`)
        return false;
    }
}

export const deleteUser = async (user_id: string) => {
    const userCollection = db.collection(USERS_COLLECTION_NAME);
    try {
        const result = await userCollection.deleteOne({_id: new ObjectId(user_id)});
        return result.deletedCount === 1;
    } catch (error: any) {
        console.error(`Error deleting user with user_id: ${user_id}`);
        return false;
    }
}

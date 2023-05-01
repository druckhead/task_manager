import {ITask} from "../../../interfaces/tasks";
import {Collection, InsertOneResult} from "mongodb";
import {TASKS_COLLECTION_NAME} from "./schema";
import {db} from "../../../index";

// read
export const getTasks = async (user_id?: string) => {
    const tasksCollection: Collection = db.collection(TASKS_COLLECTION_NAME);
    try {
        let result;
        if (user_id) {
            result = await tasksCollection.find({user_id: user_id}).toArray();
        } else {
            result = await tasksCollection.find().toArray();
        }
        return result;
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`);
        return {success: false, error: error.message};
    }
}

// create
export const insertNewTask = async (task: ITask) => {
    const tasksCollection: Collection = db.collection(TASKS_COLLECTION_NAME);
    try {
        const result: InsertOneResult = await tasksCollection.insertOne(task);
        return {success: true, ...result};
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`);
        return {success: false, error: error.message};
    }
};

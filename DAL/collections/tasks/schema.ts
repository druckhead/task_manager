import {Db} from "mongodb";
import {checkIfCollectionExist} from "../../connection";

export const TASKS_COLLECTION_NAME: string = 'tasks';

export const DROP_COLLECTION = false;

export const createTasksCollection = async (db: Db) => {
    try {
        const isCollectionExist: boolean = await checkIfCollectionExist(db, TASKS_COLLECTION_NAME);
        if (isCollectionExist && DROP_COLLECTION) {
            await db.dropCollection(TASKS_COLLECTION_NAME);
        } else if (isCollectionExist) {
            return;
        }
        const tasksCollection = await db.createCollection(TASKS_COLLECTION_NAME, {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [
                        'user_id',
                        'name',
                        'description',
                        'deadline'
                    ],
                    properties: {
                        user_id: {
                            bsonType: 'objectId',
                            description: 'user_id is required'
                        },
                        name: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                            pattern: '^[a-zA-Z\\s]{1,}$', // TODO: think it through
                        },
                        description: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                            pattern: '^[a-zA-Z\\s]{1,}$', // TODO: think it through
                        },
                        deadline: {
                            bsonType: 'date',
                            description: 'must be date and is required'
                        }
                    }
                }
            },
            validationAction: 'error',
            validationLevel: 'strict'
        });

        // if (tasksCollection) {
        //     await tasksCollection.createIndex({}, {})
        // }
    } catch (error: any) {
        console.error(`Error creating tasks collection: ${error.stack()}`);
        throw error;
    }
}
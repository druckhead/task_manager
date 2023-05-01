import {ITask} from "../interfaces/tasks";

const task1: ITask = {
    title: "Do Homework",
    description: "page 7",
    isDone: false,
    user_id: '1'
}

const task2: ITask = {
    title: "Run",
    isDone: false,
    user_id: '2'
}

const tasks: ITask[] = [task1, task2];

export const getTasksDAL = (user_id: string) => {
    const userTasks = tasks.filter((task: ITask) => {
        return task.user_id === user_id;
    });
    console.log(`getTasksDAL finished: ${JSON.stringify(userTasks)}`);
    return userTasks;
}

export const createTasksDAL = (task: ITask) => {
    try {
        tasks.push(task);
        console.log(`task has been added to the db`);
        return true;
    } catch (error: any) {
        console.error(`Error inserting task: ${error.message}`);
        return false;
    }
}
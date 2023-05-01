import {ITask} from "../interfaces/tasks";
import {getTasks, insertNewTask} from "../DAL/collections/tasks/queries";

export const getTasksHandler = async (user_id?: string) => {
  const dbResult = await getTasks(user_id);
  const displayedTasks = dbResult;
  console.log(`displayedTasks: ${JSON.stringify(displayedTasks)}`);
  return displayedTasks;
}

export const createTasksHandler = async (task: ITask) => {
  const dbResult = await insertNewTask(task)
  console.log(`createTaskHandler result is: ${dbResult}`);
  return dbResult;
}
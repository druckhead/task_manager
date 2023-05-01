import {Router} from "express";
import {createTasksController, getTasksController} from "../controllers/taskController";

export const taskRouter = Router();

taskRouter.get('/', getTasksController);
taskRouter.post('/', createTasksController);

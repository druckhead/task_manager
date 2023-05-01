import {Request, Response} from "express";
import {createTasksHandler, getTasksHandler} from "../handlers/taskHandler";
import {createTaskBodySchema} from "../middlewares/bodyValidations";

export const getTasksController = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query;
        const {user_id} = queryParams;
        const result = await getTasksHandler(user_id ? String(user_id): user_id);
        res.status(200).json({
            status: "success",
            result
        });
    } catch (error: any) {
        console.error(`Error in getTasksController: ${error.stack}`)
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
}

export const createTasksController = async (req: Request, res: Response) => {
    try {
        const body = createTaskBodySchema.parse(req.body)
        const {title, description, isDone, user_id} = body;
        const result = await createTasksHandler({
            title,
            description,
            isDone,
            user_id
        });
        const returnJson = {
            status: result.success ? "success" : "failed",
            message: result.success ? "task created successfully" : "task did not create"
        }
        const statusCode: number = result ? 200 : 400;
        res.status(statusCode).json(returnJson);
    } catch (error: any) {
        console.error(`Error in createTasksController: ${error.stack}`);
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
}
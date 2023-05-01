import {Request, Response} from "express";
import {createUserHandler, deleteUserHandler, getUsersHandler, updateUserHandler} from "../handlers/userHandler";
import {createUserBodySchema, updateUserBodySchema} from "../middlewares/bodyValidations";
import {ObjectId} from "mongodb";
import {getUsers} from "../DAL/collections/users/queries";
import {ZodError} from "zod";

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query;
        const {user_id} = queryParams;
        const result = await getUsersHandler(user_id ? String(user_id) : user_id);
        res.status(200).json({
            status: "success",
            result
        });
    } catch (error: any) {
        console.error(`Error in getUsersController: ${error.message}`);
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
}

export const createUsersController = async (req: Request, res: Response) => {
    try {
        const body = createUserBodySchema.parse(req.body);
        const {email, password, firstName} = body;
        const result = await createUserHandler({
            email,
            password,
            firstName
        });
        const returnJson = {
            status: result.success ? "success" : "failed",
            message: result.success ? "task created successfully" : "task did not create"
        };
        const statusCode: number = result.success ? 200 : 400;
        res.status(statusCode).json(returnJson);
    } catch (error: any) {
        console.error(`Error in createUsersController: ${error.stack}`);
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const data = updateUserBodySchema.parse(req.body);
        const {user_id} = req.params;

        if (ObjectId.isValid(user_id)) {
            const result = await updateUserHandler(String(user_id), data);

            res.status(result ? 200 : 400).json({
                status: result ? "Success" : "Fail",
                message: result
                    ? `User user_id=${user_id} has been updated`
                    : "User was not found",
                user: result ? await getUsers(user_id) : null,
            });
        } else {
            res.status(400).json({
                status: "Fail",
                message: "Invalid user_id"
            });
        }
    } catch (error: any) {
        if (error instanceof ZodError) {
            res.status(400).json({
                status: "Invalid data received",
                message: error.errors,
            });
        }
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params;
        if (ObjectId.isValid(user_id)) {
            const result = await deleteUserHandler(user_id);
            res.status(result ? 200 : 400).json({
                status: result ? "Success" : "Fail",
                message: result
                    ? `User ${user_id} deleted successfully`
                    : "User was not found"
            });
        } else {}
        res.status(400).json({
            status: "Fail",
            message: "Invalid user_id"
        });
    } catch (error: any) {
        console.error(`Error in deleteUserController: ${error.stack}`);
        res.status(500).json({
            status: "Internal error",
            error: error instanceof ZodError ? error.errors : error.message
        })
    }
}
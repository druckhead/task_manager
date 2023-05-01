import {Router} from "express";
import {
    createUsersController,
    deleteUserController,
    getUsersController,
    updateUserController
} from "../controllers/userController";

export const userRouter = Router();

userRouter.get('/', getUsersController);
userRouter.post('/', createUsersController);
userRouter.patch("/:user_id", updateUserController);
userRouter.delete("/:user_id", deleteUserController);

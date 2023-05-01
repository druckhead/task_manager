import express, {Express, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import {taskRouter} from "./routers/taskRouter";
import {Db} from "mongodb";
import {establishDBConnection} from "./DAL/connection";
import {userRouter} from "./routers/userRouter";

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/tasks', taskRouter);
app.use('/users', userRouter);
export let db: Db;

const connectToDb = async () => {
    try {
        db = await establishDBConnection();
    } catch (error: any) {
        throw error;
    }
}

// launching the db and app
connectToDb().then(async () => {
    console.log(`Connected to DB successfully`);
    app.listen(3000, () => {
        console.log(`express app running on 3000`);
    });
}).catch((error: any) => {
    console.error(`Failed connection to DB`);
    throw error;
})
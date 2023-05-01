import * as z from "zod"

export const createTaskBodySchema = z.object({
    title: z.string().max(128).min(1),
    description: z.string().max(512).optional(),
    isDone: z.boolean(),
    user_id: z.string()
});

export const updateTaskBodySchema = z.object({
    title: z.string().max(128).min(1).optional(),
    description: z.string().max(100).optional(),
    isDone: z.boolean().optional(),
});

export const createUserBodySchema = z.object({
    email: z.string(),
    password: z.string().min(8),
    firstName: z.string()
});

export const updateUserBodySchema = z.object({
    email: z
        .string()
        .regex(
            RegExp(
                "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            )
        )
        .optional(),
    firstName: z.string().optional(),
    password: z.string().optional(),
});
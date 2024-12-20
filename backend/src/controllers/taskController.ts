import { Request, Response } from 'express';
import {
    getTasksService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
} from '../services/taskService';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getTasksService(req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await createTaskService(req.user.id, req.body);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await updateTaskService(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await deleteTaskService(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

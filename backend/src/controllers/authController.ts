import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            // Обработка ошибки, если error является экземпляром Error
            res.status(401).json({ message: error.message });
        } else {
            // Резервный вариант, если error имеет другой тип
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user: { id: number };
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as { id: number };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
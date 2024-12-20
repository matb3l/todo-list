import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { z } from 'zod';

const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const registerUser = async (data: any) => {
    const validatedData = registerSchema.parse(data);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    return prisma.user.create({
        data: { ...validatedData, password: hashedPassword },
    });
};

export const loginUser = async (data: any) => {
    const validatedData = loginSchema.parse(data);
    const user = await prisma.user.findUnique({ where: { email: validatedData.email } });
    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
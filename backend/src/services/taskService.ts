import prisma from '../utils/prisma';

export const getTasksService = (userId: number) => {
    return prisma.task.findMany({ where: { userId } });
};

export const createTaskService = (userId: number, data: any) => {
    return prisma.task.create({
        data: { ...data, userId },
    });
};

export const updateTaskService = (id: string, data: any) => {
    return prisma.task.update({ where: { id: Number(id) }, data });
};

export const deleteTaskService = (id: string) => {
    return prisma.task.delete({ where: { id: Number(id) } });
};
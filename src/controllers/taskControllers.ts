import { NextFunction, Request, Response } from "express";
import { taskSchema } from "../validations/taskSchema";
import { taskServices } from "../services/taskServices";
import { taskRepository } from "../repositories/taskRepository";

export const taskControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;

      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskCreated = await taskServices.create(task, taskRepository);

      return res.status(200).json({ message: "Tasks!", taskCreated });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, status } = taskSchema.parse(req.body);
      const userID = req.userID;
      const { taskID } = req.params;

      const task = {
        title,
        description,
        date,
        status,
        idUser: userID,
      };

      const taskUpdate = await taskServices.update(
        taskID,
        task,
        taskRepository
      );

      return res.status(200).json({ message: "Task updated!", taskUpdate });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userID;
      const { taskID } = req.params;

      const taskDelete = await taskServices.delete(
        taskID,
        userID,
        taskRepository
      );

      return res.status(200).json({ message: "Task deleted!", taskDelete });
    } catch (error) {
      return next(error);
    }
  },
};

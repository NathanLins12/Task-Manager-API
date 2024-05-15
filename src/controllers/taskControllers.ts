
import { Request, Response, NextFunction } from "express";

export const taskControllers = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "login successful!" });
    } catch (error) {
      return next(error);
    }
  },
};

import { Request, Response, NextFunction } from "express";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const {name, email, password} = req.body
      return res.status(201).json({ message: "User created!" });
    } catch (error) {
      return next(error);
    }
  },
};
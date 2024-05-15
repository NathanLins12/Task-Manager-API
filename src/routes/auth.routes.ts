import { Router } from "express";
import { userControllers } from "../controllers/userControllers";

export const authRoutes = Router();

authRoutes.get("/", userControllers.read);

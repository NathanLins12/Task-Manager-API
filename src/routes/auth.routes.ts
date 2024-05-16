import { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import { authControllers } from "../controllers/authControllers";

export const authRoutes = Router();

authRoutes.get("/", authControllers.login);

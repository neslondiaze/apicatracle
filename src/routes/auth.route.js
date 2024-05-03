import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyReginterValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyReginterValidator, register);

router.post("/login", bodyLoginValidator, login);

export default router;

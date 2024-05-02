import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { body } from "express-validator";
import {
  bodyLoginValidator,
  bodyReginterValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyReginterValidator, register);

router.post("/login", bodyLoginValidator, login);

export default router;

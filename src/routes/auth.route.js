import express from "express";
import { infoUser, login, register } from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyReginterValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyReginterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/protected", infoUser);

export default router;

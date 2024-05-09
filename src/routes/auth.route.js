import express from "express";
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLoginValidator,
  bodyReginterValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyReginterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/protected", requireToken, infoUser);

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/logout", logout);

export default router;

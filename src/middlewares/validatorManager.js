import { validationResult, body, param } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const bodyReginterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  body("password", "Formato de password incorrecto").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden los password");
      }
      return value;
    }
  ),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];

import { Router } from "express";
import { login } from "./auth.controller.js";
import { check } from "express-validator";
import { indentifierExistence } from "../middlewares/auth.middlewares.js";
import { validar } from "../middlewares/validate-fields.js";

const router = Router();

//Login
router.post(
    '/login',
    [
        check('identifier').not().isEmpty().withMessage('The field is empty ❌'),
        check('password').not().isEmpty().withMessage('The field is empty ❌'),
        check('identifier').custom(indentifierExistence),
        validar
    ], login
);

export default router;
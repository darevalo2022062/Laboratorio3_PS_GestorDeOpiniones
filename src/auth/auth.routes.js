import { Router } from "express";
import { login } from "./auth.controller.js";
import { check } from "express-validator";
import { indentifierExistence } from "../middlewares/auth.middlewares.js";

const router = Router();

//Login
router.post(
    '/login',
    [
        check('identifier').not().isEmpty(),
        check('identifier').custom(indentifierExistence),
        check('password').not().isEmpty()
    ], login
);

export default router;
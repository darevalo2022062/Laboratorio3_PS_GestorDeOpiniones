import { Router } from "express";
import { userPost_Register } from "./user.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-fields.js";
import { uniqueEmail, uniqueUsername } from "../middlewares/user.middlewares.js";

const router = Router();

//Ruta hacía creación de usuario
router.post(
    '/register',
    [
        check('username').not().isEmpty(),
        check('username').custom(uniqueUsername),
        check('email').isEmail(),
        check('email').custom(uniqueEmail),
        check('password').not().isEmpty(),
        check('password').isLength({ min: 5 }),
        validar
    ], userPost_Register
);

//

export default router;
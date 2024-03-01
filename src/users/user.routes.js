import { Router } from "express";
import { userPost_Register, userPut_Update } from "./user.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-fields.js";
import { uniqueEmail, uniqueUsername, validateCurrentPassword } from "../middlewares/user.middlewares.js";
import { readToken } from "../helpers/token-helper.js";

const router = Router();

//Ruta hacía creación de usuario
router.post(
    '/register',
    [
        check('username').not().isEmpty().withMessage('The field is empty ❌'),
        check('username').custom(uniqueUsername),
        check('email').isEmail(),
        check('email').custom(uniqueEmail),
        check('password').not().isEmpty().withMessage('The field is empty ❌'),
        check('password').isLength({ min: 5 }),
        validar
    ], userPost_Register
);

//Ruta hacía actualización del usuario
router.put(
    '/update',
    [
        readToken,
        check('currentPassword').not().isEmpty().withMessage('The field is empty ❌'),
        check('currentPassword').custom(validateCurrentPassword),
        check('username').custom(uniqueUsername),
        validar
    ], userPut_Update
);

export default router;
import { Router } from "express";
import { userPost_Register } from "./user.controller.js";
import { check } from "express-validator";

const route = Router();

//Ruta hacía creación de usuario
route.post(
    '/register',
    [
        check('userName').not().isEmpty(),
        check('email').isEmail(),
        check('password').not().isEmpty(),
        validar
    ], userPost_Register
);



export default route;
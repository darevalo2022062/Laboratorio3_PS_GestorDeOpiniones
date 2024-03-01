import { Router } from "express";
import { opinionPostCreate } from "./opinion.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    '/new',
    [
        check('tittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('category').not().isEmpty().withMessage('The field is empty ❌'),
        check('category').custom(),
        check('mainText').not().isEmpty().withMessage('The field is empty ❌'),
        validar
    ], opinionPostCreate
);


export default router;
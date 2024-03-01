import { Router } from "express";
import { commentPostCreate } from "./comment.controller.js";
import { readToken } from "../helpers/token-helper.js";
import { check } from "express-validator";
import { opinionExistenceComm } from "../middlewares/comment.middlewares.js";
import { validar } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    '/new',
    [
        readToken,
        check('postTittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('postDate').not().isEmpty().withMessage('The field is empty ❌'),
        check('commentText').not().isEmpty().withMessage('The field is empty ❌'),
        opinionExistenceComm,
        validar
    ], commentPostCreate
);

export default router;
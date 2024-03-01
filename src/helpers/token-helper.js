import jwt from 'jsonwebtoken';

//Lectura de token
export const readToken = async (req, res, next) => {
    if (!global.token) {
        return res.status(400).json({
            msg: '¡You must first log in! 🔐'
        });
    } else {
        let token = global.token;
        var userID = jwt.verify(token, process.env.PASSWEBTOKEN);
        global.loginID = userID.userId;
    }
    next();
}
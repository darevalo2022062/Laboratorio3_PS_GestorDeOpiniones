import bcrypt from 'bcrypt';
import User from './user.js';
import { generateToken } from '../helpers/generate-jwt.js';

//Validación de datos
export const login = async (req, res) => {
    var { identifier, password } = req.body;
    let user = await User.findOne(identifier);
    password = await bcrypt.compare(password, user.password);
    if (password) {
        // -> CUENTA VALIDADA
        let token = await generateToken(user._id);
        global.loginID = null;
        global.loginID = token;
        res.status(200).json({
            msg: 'session logged in successfully',
            token
        });
    }
}
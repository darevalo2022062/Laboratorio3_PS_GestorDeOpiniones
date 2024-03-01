import bcrypt from 'bcrypt';
import User from './user.js';
import jwt from 'jsonwebtoken';

//Función de 'Registro', creación de usuario.
export const userPost_Register = async (req, res) => {
    var { email, username, password } = req.body;
    password = await bcrypt.hash(password, 10);
    let newUser = new User({ email, username, password });
    await newUser.save();

    newUser = { email, username };

    res.status(200).json({
        msg: 'Your registration was successful✅',
        newUser
    });
}

//Función de edición de usuario
export const userPut_Update = async (req, res) => {
    var { username, password } = req.body;
    let token = global.loginID;
    var userID = jwt.verify(tokenSave, process.env.PASSWEBTOKEN);
    var user = await User.findById(userID);
    if (!username && !password) {
        return res.status(400).json({
            msg: 'You need at least one piece of information to be able to update'
        });
    } else {
        if (username) {
            await User.findByIdAndUpdate(user._id, { $set: { username: username } });
        }

        if (password) {
            password = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(user._id, { $set: { password: password } });
        }

    }

}
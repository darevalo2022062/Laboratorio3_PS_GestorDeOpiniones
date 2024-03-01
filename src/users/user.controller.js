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


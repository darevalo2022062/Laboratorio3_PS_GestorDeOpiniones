import User from "../users/user.js";
import bcrypt from 'bcrypt';
//Verificar que no exista el mismo username
export const uniqueUsername = async (username) => {
    let userName = await User.findOne({ username: username });

    if (userName) {
        throw new Error('This username is already in use ❌');
    }
}

//Verificar que noexista el mismo email
export const uniqueEmail = async (email) => {
    let emailE = await User.findOne({ email: email });
    if (emailE) {
        throw new Error('This email is already in use ❌');
    }
}

//Verificar contraseña actual de usuario para permitir los cambios
export const validateCurrentPassword = async (currentPassword) => {
    let user = await User.findById(global.loginID);
    let validate = await bcrypt.compare(currentPassword, user.password);
    if (!validate) {
        throw new Error('The password is not correct 🔒❌')
    }
}

//Verificar nombre unico para UPDATE
export const uniqueUsernameUpdate = async (username) => {
    let userName = await User.findOne({ username: username });

    if (userName) {
        console.log(userName._id + " | " + global.loginID);
        if (userName._id != global.loginID) {
            throw new Error('This username is already in use ❌');
        }
    }
}
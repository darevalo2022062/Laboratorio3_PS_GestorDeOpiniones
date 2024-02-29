import User from "../users/user.js";

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
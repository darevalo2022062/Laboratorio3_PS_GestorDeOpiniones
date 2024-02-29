import User from "../users/user.js";

export const uniqueUsername = async (username) => {
    let userName = await User.findOne({ username: username });
    if (userName) {
        throw new Error('This username is already in use :(');
    }
}
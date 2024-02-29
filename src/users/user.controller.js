import bcrypt from 'bcrypt';
import User from './user.js';

export const userPost_Register = async (req, res) => {
    var { email, username, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password });
    await newUser.save();
    res.status(200).json({
        msg: 'Your registration was successful✅',
        newUser
    });
}
import User from "../users/user.js"

//Verificar existencia del email o username en DB
export const indentifierExistence = async (identifier) => {
    let existence = await User.findOne({
        $or: [
            { email: identifier },
            { username: identifier }
        ]
    });

    if (!existence) {
        throw new Error("This email or username does not exists in DB ❌");
    }
}
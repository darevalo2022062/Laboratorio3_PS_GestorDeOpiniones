import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'This is mandatory information.']
    },
    username: {
        type: String,
        required: [true, 'This is mandatory information.']
    },
    password: {
        type: String,
        required: [true, 'This is mandatory information.']
    }
});

export default model('User', UserSchema);
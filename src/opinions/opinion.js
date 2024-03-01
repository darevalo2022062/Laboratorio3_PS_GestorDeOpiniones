import { Schema, model } from 'mongoose';

const OpinionSchema = Schema({
    fixedUser: {
        type: String,
        required: [true, 'This is mandatory information. (ID - USER) ']
    },
    tittle: {
        type: String,
        required: [true, 'This is mandatory information.']
    },
    category: {
        type: String,
        default: 'GENERAL'
    },
    mainText: {
        type: String,
        required: [true, 'This is mandatory information.']
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default model('Opinion', OpinionSchema);
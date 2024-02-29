import { Schema, model } from 'mongoose';

const CommentSchema = Schema({
    fixedUser: {
        type: String,
        required: [true, 'This is mandatory information. (ID - USER) ']
    },
    fixedOpinion: {
        type: String,
        required: [true, 'This is mandatory information. (ID - OPINION)']
    },
    commentText: {
        type: String,
        required: [true, 'This is mandatory information.']
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default model('Comment', CommentSchema);
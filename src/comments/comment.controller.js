import User from "../users/user.js";
import Comment from "./comment.js";

export const commentPostCreate = async (req, res) => {
    var { commentText } = req.body;
    const fixedUser = global.loginID;
    const fixedOpinion = req.opinionID;

    console.log(fixedUser + " / " + fixedOpinion);

    const comment = new Comment({ fixedUser, fixedOpinion, commentText });
    await comment.save();
    res.status(200).json({
        msg: 'Comment published successfully✅'
    });
}

export const commentPutUpdate = async (req, res) => {
    var { commentText } = req.body;
    const commentID = global.commentID;
    await Comment.findByIdAndUpdate(commentID, { $set: { commentText: commentText } });
    global.commentID = 0;
    res.status(200).json({
        msg: 'Comment updated successfully✅'
    });
}

export const commentDelete = async (req, res) => {
    const commentID = global.commentID;
    await Comment.findByIdAndUpdate(commentID, { $set: { state: false } });
    res.status(200).json({
        MSG: 'Comment delete successfully✅'
    });

}

//Ver Comentario por publicación
export const commentViewByPost = async (req, res) => {
    const opinionID = req.opinionID;
    var comments = await Comment.find({ fixedOpinion: opinionID });
    if (comments.length > 0) {
        const commentsInfoPromises = comments.map(async comment => {
            var userID = comment.fixedUser;
            var user = await User.findById(userID);
            var userNameJust = user.username;
            if (userID == global.loginID) {
                userNameJust = 'YOU';
            }
            return {
                published_By: userNameJust,
                publicationDay: comment.commentDate,
                comment: comment.commentText
            };
        });
        const commentsInfo = await Promise.all(commentsInfoPromises);
        return res.status(200).json({
            msg: "COMMENTS",
            commentsInfo
        });
    }

}

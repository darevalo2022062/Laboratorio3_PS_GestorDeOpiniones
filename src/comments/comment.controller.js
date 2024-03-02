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
    console.log("El comment ID: " + commentID);
    await Comment.findByIdAndUpdate(commentID, { $set: { commentText: commentText } });
    res.status(200).json({
        msg: 'Comment updated successfully✅'
    });
}

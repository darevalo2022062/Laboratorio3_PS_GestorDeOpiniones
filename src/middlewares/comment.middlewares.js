import Opinion from "../opinions/opinion.js";
import Comment from "../comments/comment.js";

export const opinionExistenceComm = async (req, res, next) => {
    var { postTittle, postDate } = req.body;

    postDate = postDate + 'T12:00:00';

    const fechaInicio = new Date(postDate);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(postDate);
    fechaFin.setHours(23, 59, 59, 999);

    var opinionFind = null;

    opinionFind = await Opinion.findOne({

        tittle: postTittle,

        datePost: {
            $gte: fechaInicio,
            $lte: fechaFin
        },

        state: true

    });

    if (!opinionFind) {
        //throw new Error('This opinion does not exists posts ❌');
        return res.status(400).json({
            msg: 'This opinion does not exists posts ❌'
        });
    } else {
        req.opinionID = opinionFind._id;
    }

    next();
}

export const commentExists = async (req, res, next) => {
    var { commentDate, tittlePost } = req.body;
    commentDate = commentDate + 'T12:00:00';
    const fechaInicio = new Date(commentDate);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(commentDate);
    fechaFin.setHours(23, 59, 59, 999);

    var commentFind = null;

    var opinions = await Opinion.find({ tittle: tittlePost });
    console.log("Estan son las opiniones: " + opinions);
    if (opinions) {
        for (var element of opinions) {
            console.log("FixedOpinion: " + element._id);
            console.log('fixedUser: ' + global.loginID);
            commentFind = await Comment.findOne({
                fixedOpinion: element._id,
                fixedUser: global.loginID,
                commentDate: {
                    $gte: fechaInicio,
                    $lte: fechaFin
                },
                state: true
            });

            if (commentFind) {
                global.commentID = commentFind._id;
            }
        }
    }

    if (!commentFind) {
        return res.status(400).json({
            msg: 'This comment does not exists in your comments ❌'
        });
    }

    next();

}
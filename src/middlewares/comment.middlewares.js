import Opinion from "../opinions/opinion.js";

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
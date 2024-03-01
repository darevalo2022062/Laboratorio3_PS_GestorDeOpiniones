import Opinion from "../opinions/opinion.js";

export const opinionExistenceComm = async (req, res, next) => {
    var { postTittle, postDate } = req.body;
    console.log("ESTE ES EL DATE: " + postDate);
    const fechaInicio = new Date(postDate);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(postDate);
    fechaFin.setHours(23, 59, 59, 999);

    const opinionFind = await Opinion.findOne({
        $and: [
            { tittle: postTittle },
            {
                datePost: {
                    $gte: fechaInicio,
                    $lte: fechaFin
                }
            },
            { state: true }
        ]
    });

    if (!opinionFind) {
        throw new Error('This opinion does not exists in your posts ❌');
    } else {
        req.opinionID = opinionFind._id;
    }

    next();
}
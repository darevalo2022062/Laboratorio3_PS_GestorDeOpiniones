import Opinion from "../opinions/opinion.js";

export const categoryExistence = async (category) => {
    let arrayCategory = ['GENERAL', 'NEWS', 'ENTERTAIMENT', 'LIFESTYLE', 'SUCCESS STORIES', ''];
    if (!arrayCategory.includes(category)) {
        throw new Error('This category does not exists in categories ❌');
    }
}

export const opinionExistence = async (req, res, next) => {
    var { tittle, date } = req.body;
    const fechaInicio = new Date(date);
    fechaInicio.setHours(0, 0, 0, 0);
    const fechaFin = new Date(date);
    fechaFin.setHours(23, 59, 59, 999);

    const opinionFind = await Opinion.findOne({
        $and: [
            { tittle: tittle },
            {
                datePost: {
                    $gte: fechaInicio,
                    $lte: fechaFin
                }
            },
            { fixedUser: global.loginID },
            { state: true }
        ]
    });

    if (!opinionFind) {
        throw new Error('This opinion does not exists in your posts ❌');
        //return res.status(400).json({ msg: 'This opinion does not exists in your posts ❌' });;
    } else {
        req.opinionID = opinionFind._id;
    }

    next();
}
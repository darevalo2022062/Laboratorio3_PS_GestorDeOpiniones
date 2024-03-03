import Opinion from './opinion.js';
import User from '../users/user.js';

//Creando opinión
export const opinionPostCreate = async (req, res) => {
    var { tittle, category, mainText } = req.body;
    let fixedUser = global.loginID;
    var opinion = '';
    try {
        opinion = new Opinion({ fixedUser, tittle, category, mainText });
        category == '' ? category = 'GENERAL' : {};
        await opinion.save();
        let opinionClean = { tittle, category, mainText };
        res.status(200).json({
            msg: 'Opinion published successfully✅',
            opinionClean
        });
    } catch (e) {
        console.log("ERROR CATCHED");
        console.log(e);
    }
}

//Editar opinion
export const opinionPutUpdate = async (req, res) => {
    var { newTittle, mainText, category } = req.body;
    category == '' ? category = 'GENERAL' : {};
    var opinionID = req.opinionID;

    if (newTittle) {
        await Opinion.findByIdAndUpdate(opinionID, { $set: { tittle: newTittle } });
    }

    if (mainText) {
        await Opinion.findByIdAndUpdate(opinionID, { $set: { mainText: mainText } });
    }

    if (category) {
        await Opinion.findByIdAndUpdate(opinionID, { $set: { category: category } });
    }

    return res.status(200).json({
        msg: 'Update successful✅'
    });
}

//Eliminar opinion
export const opinionDelete = async (req, res) => {
    var opinionID = req.opinionID;
    await Opinion.findByIdAndUpdate(opinionID, { $set: { state: false } });
    res.status(200).json({
        msg: 'Delete successful✅'
    });
}

//Visualizar todas las opiniones
export const opinionGet = async (req, res) => {
    const userID = global.loginID;
    const opinions = await Opinion.find({ state: true, fixedUser: { $ne: userID } });
    if (opinions.length > 0) {

        const opinionInfoPromises = opinions.map(async opinion => {
            var idUser = opinion.fixedUser;
            const user = await User.findById(idUser);
            const publishedBy = user ? user.username : null;
            return {
                published_By: publishedBy,
                publicationDay: opinion.datePost,
                tittle: opinion.tittle,
                category: opinion.category,
                mainText: opinion.mainText
            };
        });

        const opinionInfo = await Promise.all(opinionInfoPromises);
        return res.status(200).json({
            msg: "POST",
            opinionInfo
        });
    } else {
        return res.status(400).json({
            msg: "There are currently no posts :/"
        });
    }
}

export const opinionGetMiPost = async (req, res) => {
    const userID = global.loginID;
    const opinions = await Opinion.find({ state: true, fixedUser: userID });
    if (opinions.length > 0) {
        const opinionInfo = opinions.map(opinion => {
            return {
                publicationDay: opinion.datePost,
                tittle: opinion.tittle,
                category: opinion.category,
                mainText: opinion.mainText
            };
        });
        return res.status(200).json({
            msg: "POST",
            opinionInfo
        });
    } else {
        return res.status(400).json({
            msg: "There are currently no posts :/"
        });
    }

} 
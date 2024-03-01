import Opinion from './opinion.js';

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
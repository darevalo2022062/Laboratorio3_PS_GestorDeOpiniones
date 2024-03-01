import Opinion from './opinion.js';

//Creando opinión
export const opinionPostCreate = async (req, res) => {
    var { tittle, category, mainText } = req.body;
    let fixedUser = global.loginID;
    var opinion = '';
    try {
        opinion = new Opinion({ fixedUser, tittle, category, mainText });
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

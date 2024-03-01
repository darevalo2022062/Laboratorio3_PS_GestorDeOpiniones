import Opinion from './opinion.js';

//Creando opinión
export const opinionPostCreate = async (req, res) => {
    var { tittle, category, mainText } = req.body;
    const opinion = new Opinion({ tittle, category, mainText });
    opinion.save();
    res.status(200).json({
        msg: 'Opinion published successfully✅',
        opinion
    });
}



///GET E POST
const pd_get = (req, res) => {

    let percurso = [];

    if (!(typeof req.session.percurso === "undefined")){

        percurso = req.session.percurso
    }
    

    console.log(req.session.percurso[0][2][0][0])
    res.render('page_dados.ejs', {percurso});

}




export { pd_get };

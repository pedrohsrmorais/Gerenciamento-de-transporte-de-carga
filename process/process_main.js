


///GET E POST
const pm_get = (req, res) => {


    
    if (!(typeof req.session.rota === "undefined")){

        delete req.session.peso;
        delete req.session.caminhao;
        delete req.session.produto_t;
        delete req.session.produto_q;
        delete req.session.rota;
        delete req.session.preços;
        delete req.session.distancia;

    }
    req.session.user = 0;
    
    res.render('page_main.ejs');

}


export { pm_get};

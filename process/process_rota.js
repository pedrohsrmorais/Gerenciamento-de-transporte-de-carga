
///GET E POST
const pr_get = (req, res) => {




    let id_r = req.params.id1;
    let id_p = req.params.id2;

    let caminhao;
    let distancia;
    let preços;
    let produto_q;
    let produto_t;
    let rotas;
    let peso;

    let user = req.session.user


    if (id_p == "percurso") {

        caminhao = req.session.caminhao[id_r]
        distancia = req.session.distancia[id_r]
        preços = req.session.preços[id_r]
        produto_q = req.session.produto_q[id_r]
        produto_t = req.session.produto_t[id_r]
        rotas = req.session.rota[id_r]
        peso = req.session.peso[id_r]




    } else {
       // distancia = req.session.percurso[id_p][2][id_r];
       caminhao = req.session.percurso[id_p][0][id_r]
       distancia = req.session.percurso[id_p][1][id_r]
       preços = req.session.percurso[id_p][2][id_r]
       produto_q = req.session.percurso[id_p][3][id_r]
       produto_t = req.session.percurso[id_p][4][id_r]
       rotas = req.session.percurso[id_p][5][id_r]
       peso = req.session.percurso[id_p][6][id_r]

       user = 1;
        
    }

    res.render('page_result.ejs', { caminhao, distancia, preços, produto_q, produto_t, rotas, peso, user, id_p });

}



export { pr_get };
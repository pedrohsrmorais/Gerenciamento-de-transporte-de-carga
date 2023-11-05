




const pp_get = (req, res) => {

    let id_percurso = req.params.id;

    let rotas;
    let caminhao;
    let distancia;
    let preços;
    let distancia_total = 0;
    let preços_total = 0;

    if (id_percurso == "novo_percurso") {
        req.session.user = 1;

        caminhao = req.session.caminhao
        distancia = req.session.distancia
        preços = req.session.preços

        rotas = req.session.rota


    } else {
        rotas = req.session.percurso[id_percurso][5]
        caminhao = req.session.percurso[id_percurso][0]
        distancia = req.session.percurso[id_percurso][1]
        preços = req.session.percurso[id_percurso][2]

        for (let x = 0; x < distancia.length; x++) {
            preços_total = (preços[x][0] + preços[x][1] + preços[x][2]) + preços_total;
            distancia_total = distancia[x] + distancia_total;

        }

    }

    let i = 0;

    if (!(typeof req.session.rota === "undefined")) {
        i = req.session.rota.length - 1;

        for (let x = 0; x < distancia.length; x++) {
            preços_total = (preços[x][0] + preços[x][1] + preços[x][2]) + preços_total;
            distancia_total = distancia[x] + distancia_total;

        }
    } else {

    }

    res.render('page_percurso.ejs', { caminhao, distancia_total, preços_total, rotas, i, id_percurso })


}

const pp_post = (req, res) => {

    let percurso = [req.session.caminhao, req.session.distancia, req.session.preços, req.session.produto_q, req.session.produto_t, req.session.rota, req.session.peso]

    if (typeof req.session.percurso === "undefined") {
        req.session.percurso = [percurso];
    } else {
        req.session.percurso.push(percurso);
    }

    res.redirect('/');

}

export { pp_get, pp_post };


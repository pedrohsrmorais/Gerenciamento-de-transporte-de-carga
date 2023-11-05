////imports
import { Achar_n_caminhao } from "../functions/fun_carga.js";
import { produto_t, produto_p } from "../functions/fun_produto.js";
import { Procura_cidade, Distancia_decode } from "../functions/fun_transp.js";




//////////////////////////////////GET E POST
const prct_get = (req, res) => {


    let nova_origem;
    let produto_q = []
    for (let i = 0; i < produto_t.length; i++) {
        produto_q.push(0)
    }


    if (!(typeof req.session.rota === "undefined")) {
        let i = req.session.rota.length - 1;

        nova_origem = req.session.rota[i][1];

        produto_q = req.session.produto_q[i];

    }

    let chave = req.session.chave;

    let user = req.session.user;



    res.render('page_r_c-t.ejs', { nova_origem, produto_t, produto_q, chave, user });



}


const prct_post = (req, res) => {
    ///////////////////////////////////////////////////////////////////////////////////TRATA ROTA e DISTANCIA

    try {
        req.session.chave = 1;
        let origem;
        const destino = req.body.cidade2;

        if (typeof req.body.cidade1 === "undefined") {
            const i = req.session.rota.length - 1;
            origem = req.session.rota[i][1];
        } else {
            origem = req.body.cidade1;
        }
        const cell = Procura_cidade(origem, destino);
        const distancia = Distancia_decode(cell); ///sessão distancia

        const rota = [origem, destino]///sessão rota






        ///////////////////////////////////////////////////////////////////////////////TRATA PRODUTO E PESO

        let produto_q = [];
        let produto_peso = 0;
        let peso_total = 0;
        
        for (let i = 0; i < produto_t.length; i++) {

            produto_q[i] = req.body[produto_t[i]]

            produto_peso = produto_q[i] * produto_p[i];
            peso_total += produto_peso;
        } ///sessão produto_q , sessão produto_t e sessão peso






        ////////////////////////////////////////////////////////////////////////////////TRATA CAMINHOES
        const n_caminhao = Achar_n_caminhao(peso_total);


        const preço_caminhao_g = n_caminhao[0] * 27.44 * distancia;
        const preço_caminhao_m = n_caminhao[1] * 11.92 * distancia;
        const preço_caminhao_p = n_caminhao[2] * 4.87 * distancia;

        const preços_caminhoes_diferentes = [preço_caminhao_g, preço_caminhao_m, preço_caminhao_p];
        /////sessão qtd de caminhoes



        /////////////////////////////////////////////////////////////////////////////////////  **SESSÕES**
        if (!(typeof req.session.rota === "undefined")) {

            req.session.peso.push(peso_total);
            req.session.caminhao.push(n_caminhao);
            req.session.produto_t.push(produto_t)
            req.session.produto_q.push(produto_q)
            req.session.rota.push(rota);
            req.session.preços.push(preços_caminhoes_diferentes);
            req.session.distancia.push(distancia);


            res.redirect('/percurso/novo_percurso')

            

        }


        if ((typeof req.session.rota === "undefined")) {


            req.session.peso = [peso_total];
            req.session.caminhao = [n_caminhao];
            req.session.produto_t = [produto_t];
            req.session.produto_q = [produto_q];
            req.session.rota = [rota];
            req.session.preços = [preços_caminhoes_diferentes];
            req.session.distancia = [distancia];


            if (req.session.user == 1) {
                res.redirect('/percurso/novo_percurso')
            } else {
                res.redirect('/rota/0/percurso')
            }




        }

    }
    catch {
        req.session.chave = 0;
        res.redirect('/req_carga-transporte')
    }
}

export { prct_get, prct_post };
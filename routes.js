import express from 'express';

const route = express.Router();


//importes de process
import { pm_get } from './process/process_main.js';
import { prct_get , prct_post} from './process/process_req_c-t.js';
import { pp_get , pp_post } from './process/process_percurso.js';
import { pr_get } from './process/process_rota.js';
import { pd_get } from './process/process_dados.js';



//rotas main 
route.get('/', pm_get)

//rotas manual de instruções
route.get('/manual', (req, res) => {
    res.render('page_manual.ejs');
})


//rotas requisição de t com carga
route.get('/req_carga-transporte', prct_get)
route.post('/req_carga-transporte', prct_post)

//rotas percurso
route.get('/percurso/:id', pp_get)
route.post('/percurso/:id', pp_post)


//rota de rota 
route.get('/rota/:id1/:id2',pr_get)


//rota de dados
route.get('/dados',pd_get)



//export
export default route;
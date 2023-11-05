import XLSX from 'xlsx';


const workbook = XLSX.readFile('dnit_convertida.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Pega a primeira row e a primeira coluna da worksheet

const firstRow = XLSX.utils.sheet_to_json(worksheet, { range: 0, header: 1, defval: "" })[0];

const firstColumn = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "", raw: false })
    .map(row => row[Object.keys(row)[0]]);



///////////////////FUNCTION
function Procura_cidade(procura_row, procura_col) {
    //row
    const row_index = firstRow.findIndex(cellValue => cellValue === procura_row);
    //col
    const col_index = firstColumn.findIndex(cellValue => cellValue === procura_col);

    const cell = { r: row_index, c: col_index };

    return cell;
}



///GET E POST
const prt_get = (req, res) => {

    if (req.session.rota_ativa == 2) {
        const i = req.session.rota.length - 1;
        const origem_anterior = req.session.rota[i][0];

        res.render('page_r_transporte.ejs', { origem_anterior });

    }

    res.render('page_r_transporte.ejs');

}


const prt_post = (req, res) => {


    let origem;
    const destino = req.body.cidade2;

    if (typeof req.body.cidade1 === "undefined") {
        const i = req.session.rota.length - 1;
        origem = req.session.rota[i][0];
        
    } else {
        origem = req.body.cidade1;
    }


    const cell = Procura_cidade(origem, destino);



    const distancia = worksheet[XLSX.utils.encode_cell(cell)].v;
    const rota = [origem, destino]



    ///CASO JÁ EXISTA ROTA
    if (req.session.rota_ativa == 2) {

        //////CONSTANTES

        const i = req.session.rota.length;

        const preço_caminhao_g = req.session.caminhao[i][0] * 27.44 * distancia;
        const preço_caminhao_m = req.session.caminhao[i][1] * 11.92 * distancia;
        const preço_caminhao_p = req.session.caminhao[i][2] * 4.87 * distancia;
        const preços_caminhoes_diferentes = [preço_caminhao_g, preço_caminhao_m, preço_caminhao_p];

        /////PUSH SESSIONS
        req.session.rota.push(rota);
        req.session.preços.push(preços_caminhoes_diferentes);
        req.session.distancia.push(distancia);

        res.redirect('/percurso')
    }

    if (req.session.rota_ativa == 1) {

        ///////////////CONSTANTES

        const preço_caminhao_g = req.session.caminhao[0][0] * 27.44 * distancia;
        const preço_caminhao_m = req.session.caminhao[0][1] * 11.92 * distancia;
        const preço_caminhao_p = req.session.caminhao[0][2] * 4.87 * distancia;
        const preços_caminhoes_diferentes = [preço_caminhao_g, preço_caminhao_m, preço_caminhao_p];

        /////////////////NEW SESSIONS
        req.session.rota = [rota];
        req.session.preços = [preços_caminhoes_diferentes];
        req.session.distancia = [distancia];

        res.redirect('/percurso')
    }



}

export { prt_get, prt_post };

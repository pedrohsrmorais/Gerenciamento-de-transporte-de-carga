/////imports
import XLSX from 'xlsx';

////constantes para as funções xlsx
const workbook = XLSX.readFile('dnit_convertida.xlsx');
const sheetName = workbook.SheetNames[1];
const worksheet = workbook.Sheets[sheetName];

//////////////pegar os produtos e pesos da tabela
let produto_t = [];
let produto_p = [];

for (let i = 1; i <= 50; i++) {
    if (worksheet[`A${i}`] == null) {
        break;}

    let produtos = worksheet[`A${i}`];
    let pesos = worksheet[`B${i}`];

    if (produtos && pesos) {

        produto_t.push(produtos.v);
        produto_p.push(pesos.v);
    }
}











export { produto_t, produto_p };

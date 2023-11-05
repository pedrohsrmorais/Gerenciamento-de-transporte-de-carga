/////imports
import XLSX from 'xlsx';

////constantes para as funções xlsx
const workbook = XLSX.readFile('dnit_convertida.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// CONSTANTES q pegam a primeira row e a primeira coluna da worksheet
const firstRow = XLSX.utils.sheet_to_json(worksheet, { range: 0, header: 1, defval: "" })[0];

const firstColumn = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "", raw: false })
    .map(row => row[Object.keys(row)[0]]);

    
///////////////////FUNCTIONS
function Procura_cidade(procura_row, procura_col) {
    //row
    const row_index = firstRow.findIndex(cellValue => cellValue === procura_row);
    //col
    const col_index = firstColumn.findIndex(cellValue => cellValue === procura_col);

    const cell = { r: row_index, c: col_index };

    return cell;
}

function Distancia_decode(cell) {
    const cell_encode = worksheet[XLSX.utils.encode_cell(cell)].v;
    return cell_encode;
}

export { Procura_cidade , Distancia_decode }

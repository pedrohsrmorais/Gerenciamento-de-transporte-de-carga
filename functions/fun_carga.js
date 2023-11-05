

const caminhao_p = [1000, 4.87];
const caminhao_m = [4000, 11.92];
const caminhao_g = [10000, 27.44];

///função para achar o número de caminhoes P / M / G 
function Achar_n_caminhao(peso_total) {

    let peso = peso_total;

    let n_caminhao_g = 0;
    let n_caminhao_m = 0;
    let n_caminhao_p = 0;

    if (peso >= 10000) {
        n_caminhao_g = Math.floor(peso / caminhao_g[0]);
        peso = peso % caminhao_g[0];
    }
    if (peso > 2000) {
        n_caminhao_m = Math.floor(peso / caminhao_m[0]);
        peso = peso % caminhao_m[0];
        if (peso > 2000) {
            n_caminhao_m = n_caminhao_m + Math.ceil(peso / caminhao_m[0]);
            peso = 0;
        }
    }
    if (peso <= 2000) {
        n_caminhao_p = Math.ceil(peso / caminhao_p[0]);
    }
    return [ n_caminhao_g, n_caminhao_m, n_caminhao_p ];
}

export {Achar_n_caminhao }
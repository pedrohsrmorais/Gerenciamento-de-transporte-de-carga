const produtos = document.querySelectorAll('.produtos');
const cidades = document.querySelectorAll('.cidade');

let prod_state = false;

addEventListener('submit', (e) => {
    if ( cidades[0].value == "" || cidades[1].value == ""){
        alert("Preencha o campo Cidade de origem e Cidade de destino")
        e.preventDefault();
    }


    for (let i = 0; i < produtos.length; i++){
        
        if (produtos[i].value != 0 && produtos[i].value != ""){
            prod_state = true;
            break;
        }
    }
    if (prod_state == false){
        alert("Selecione pelo menos um item a ser transportado")
        e.preventDefault();
    }
});

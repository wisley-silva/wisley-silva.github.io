console.log(produtos[0].description)


// A. Estado e variáveis com referência de elementos do DOM
const containerProdutos = document.getElementById("produtos");
const containerCesto = document.getElementById("cesto");

if(!localStorage.getItem('produtos-selecionados')){
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// B. Funções utilitárias
function criarProduto(produto){
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = produto.image;
    img.alt = produto.title;

    const h2 = document.createElement("h2");
    h2.textContent = produto.title;

    const pDescricao = document.createElement("p");
    pDescricao.textContent = produto.description;

    const pPreco = document.createElement("p");
    pPreco.textContent = `Preço: ${produto.price} €`;

    const pRating = document.createElement("p");
    pRating.textContent = `Avaliação ${produto.rating.rate}`;


    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.textContent = "+ Adicionar ao cesto";

    botaoAdicionar.addEventListener ("click", () =>{
        const cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados"))

        cestoAtual.push(produto);

        localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));

        console.log("Produto adicionado ao cesto:", produto.title);

        atualizaCesto();
    });

    article.append(img, h2, pDescricao, pPreco, pRating, botaoAdicionar);


    return article;
}

function criaProdutoCesto(produto) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = produto.image;
    img.alt = produto.title;

    const h2 = document.createElement("h2");
    h2.textContent = produto.title;

    const pPreco = document.createElement("p");
    pPreco.textContent = `Preço: ${produto.price} €`;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";

    botaoRemover.addEventListener("click", () => {
        // 1. Vai buscar a lista atual ao localStorage
        let cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

        // 2. Encontra o índice do produto na lista usando o 'id' (ou o 'title')
        const index = cestoAtual.findIndex(item => item.id === produto.id);

        // 3. Se encontrar o produto na lista, remove-o com o splice
        if (index !== -1) {
            cestoAtual.splice(index, 1);

            // 4. Guarda a lista alterada novamente no localStorage
            localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));

            // 5. Atualiza o cesto no ecrã
            atualizaCesto();
        }
    });

    article.append(img, h2, pPreco, botaoRemover);

    return article;
}

function atualizaCesto() {
    // 1. Limpa o container do cesto para garantir que atualiza do zero
    containerCesto.innerHTML = "";

    // 2. Vai buscar a lista de produtos-selecionados ao localStorage
    const cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

    let precoTotal = 0;

    // 3. Percorre a lista e cria um <article> para cada produto
    cestoAtual.forEach(produto => {
        const artigoCesto = criaProdutoCesto(produto);
        containerCesto.appendChild(artigoCesto);

        precoTotal += produto.price;
    });

    // 4. Cria um elemento para apresentar o preço total dos produtos selecionados
    const divTotal = document.createElement("div");
    divTotal.innerHTML = `<h3>Preço Total: ${precoTotal.toFixed(2)} €</h3>`;
    containerCesto.appendChild(divTotal);
}

// C. Event handlers

function renderizarProdutos(produtos){

    containerProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const artigoCriado = criarProduto(produto);

        containerProdutos.appendChild(artigoCriado);
    });

}

// D. Event Listeners

// E. Inicialização

renderizarProdutos(produtos)
atualizaCesto();

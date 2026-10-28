console.log(produtos[0].description)


// A. Estado e variáveis com referência de elementos do DOM
const containerProdutos = document.getElementById("produtos");

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
    pPreco.textContent = produto.price;

    const pRating = document.createElement("p");
    pRating.textContent = `Avaliação ${produto.rating.rate}`;

    article.append(img, h2, pDescricao, pPreco, pRating);

    return article;
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

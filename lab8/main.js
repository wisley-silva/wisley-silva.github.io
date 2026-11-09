let todosOsProdutos = [];

// 1. Obter as categorias da API e preencher o <select>
fetch("https://deisishop.pw.deisi.ulusofona.pt/categories")
    .then(response => response.json())
    .then(categorias => {
        console.log("Dados das categorias:", categorias); // Veja isto na Consola (F12)

        const selectFiltro = document.querySelector("#filtro-categoria");
        if (!selectFiltro) return;

        categorias.forEach(cat => {
            const option = document.createElement("option");

            // Se o objeto tiver uma propriedade 'name' ou 'title', use-a.
            // Se for um objeto com a chave exata, ajuste aqui (ex: cat.name ou cat.title)
            const nomeCategoria = cat.name || cat.title || cat;

            option.value = nomeCategoria;
            option.textContent = nomeCategoria;
            selectFiltro.appendChild(option);
        });
    })
    .catch(error => console.error("Erro ao carregar categorias:", error));

// 2. Obter os produtos da API
fetch("https://deisishop.pw.deisi.ulusofona.pt/products")
    .then(response => response.json())
    .then(data => {
        todosOsProdutos = data;
        renderProducts(todosOsProdutos);
    })
    .catch(error => console.error("Erro ao carregar produtos:", error));

// 3. Função para renderizar os produtos
function renderProducts(products) {
    const container = document.querySelector("#produtos");
    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
        const item = document.createElement("article");
        item.classList.add("produto-card");

        let imageUrl = product.image;
        if (imageUrl && imageUrl.startsWith("/")) {
            imageUrl = "https://deisishop.pw.deisi.ulusofona.pt" + imageUrl;
        }

        item.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" width="120">
            <h3>${product.title}</h3>
            <p><strong>${product.price} €</strong></p>
            <button>Adicionar ao cesto</button>
        `;

        container.appendChild(item);
    });
}

// 4. Filtrar produtos ao alterar a opção no <select>
const selectFiltro = document.querySelector("#filtro-categoria");
if (selectFiltro) {
    selectFiltro.addEventListener("change", (event) => {
        const categoriaSelecionada = event.target.value;

        if (categoriaSelecionada === "all") {
            renderProducts(todosOsProdutos);
        } else {
            const produtosFiltrados = todosOsProdutos.filter(product => product.category === categoriaSelecionada);
            renderProducts(produtosFiltrados);
        }
    });
}


const selectOrdenar = document.querySelector("#ordenar-preco");

if (selectOrdenar) {
    selectOrdenar.addEventListener("change", (event) => {
        const criterio = event.target.value;


        let produtosOrdenados = [...todosOsProdutos];

        if (criterio === "crescente") {

            produtosOrdenados.sort((a, b) => a.price - b.price);
        } else if (criterio === "decrescente") {

            produtosOrdenados.sort((a, b) => b.price - a.price);
        } else {

            produtosOrdenados = [...todosOsProdutos];
        }


        renderProducts(produtosOrdenados);
    });
}

// Selecionar o input de pesquisa
const inputPesquisa = document.querySelector("#pesquisa-produto");

if (inputPesquisa) {
    inputPesquisa.addEventListener("input", (event) => {
        const termoPesquisa = event.target.value.toLowerCase().trim();

        const produtosFiltrados = todosOsProdutos.filter(product =>
            product.title.toLowerCase().includes(termoPesquisa)
        );

        renderProducts(produtosFiltrados);
    });
}

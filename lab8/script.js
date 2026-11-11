// A. Inicialização segura do localStorage
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

let todosOsProdutos = [];

// B. Função global para redesenhar a lista do cesto
window.atualizaCesto = function() {
    const listaPrecoCesto = document.getElementById("lista-preco");
    const precoTotalEl = document.getElementById("preco-total");

    if (!listaPrecoCesto) return;

    listaPrecoCesto.innerHTML = "";

    let cestoAtual = [];
    try {
        cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    } catch (e) {
        cestoAtual = [];
    }

    let precoTotal = 0;

    cestoAtual.forEach(produto => {
        const artigoCesto = window.criaProdutoCesto(produto);
        listaPrecoCesto.appendChild(artigoCesto);
        precoTotal += Number(produto.price) || 0;
    });

    if (precoTotalEl) {
        precoTotalEl.textContent = precoTotal.toFixed(2);
    }
};

// C. Função global para criar o cartão do produto no cesto
window.criaProdutoCesto = function(produto) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    let imageUrl = produto.image;
    if (imageUrl && imageUrl.startsWith("/")) {
        imageUrl = "https://deisishop.pw.deisi.ulusofona.pt" + imageUrl;
    }
    img.src = imageUrl;
    img.alt = produto.title;
    img.style.maxWidth = "80px";

    const h3 = document.createElement("h3");
    h3.textContent = produto.title;

    const pPreco = document.createElement("p");
    pPreco.textContent = `Custo total: ${Number(produto.price).toFixed(2)} €`;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "- Remover do Cesto";

    botaoRemover.addEventListener("click", () => {
        let cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
        const index = cestoAtual.findIndex(item => item.id === produto.id);

        if (index !== -1) {
            cestoAtual.splice(index, 1);
            localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));
            window.atualizaCesto();
        }
    });

    article.append(h3, img, pPreco, botaoRemover);
    return article;
};

// D. Função para criar o cartão do produto na loja
function criarProduto(produto) {
    const article = document.createElement("article");

    const img = document.createElement("img");
    let imageUrl = produto.image;
    if (imageUrl && imageUrl.startsWith("/")) {
        imageUrl = "https://deisishop.pw.deisi.ulusofona.pt" + imageUrl;
    }
    img.src = imageUrl;
    img.alt = produto.title;
    img.style.maxWidth = "150px";

    const h2 = document.createElement("h2");
    h2.textContent = produto.title;

    const pDescricao = document.createElement("p");
    pDescricao.textContent = produto.description;

    const pPreco = document.createElement("p");
    pPreco.textContent = `Preço: ${Number(produto.price).toFixed(2)} €`;

    const botaoAdicionar = document.createElement("button");
botaoAdicionar.textContent = "Adicionar ao cesto";

botaoAdicionar.addEventListener("click", () => {
    let cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    cestoAtual.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));

    window.atualizaCesto();
});

    article.append(img, h2, pDescricao, pPreco, botaoAdicionar);
    return article;
}
// E. Renderizar produtos na loja
function renderizarProdutos(produtos) {
    const containerProdutos = document.getElementById("produtos");
    if (!containerProdutos) return;

    containerProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const artigoCriado = criarProduto(produto);
        containerProdutos.appendChild(artigoCriado);
    });
}

// F. Filtros, Pesquisa e Ordenação
const selectFiltro = document.querySelector("#filtro-categoria");
if (selectFiltro) {
    selectFiltro.addEventListener("change", (event) => {
        const categoriaSelecionada = event.target.value;
        if (categoriaSelecionada === "all") {
            renderizarProdutos(todosOsProdutos);
        } else {
            const produtosFiltrados = todosOsProdutos.filter(p => p.category === categoriaSelecionada);
            renderizarProdutos(produtosFiltrados);
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
        }

        renderizarProdutos(produtosOrdenados);
    });
}

const inputPesquisa = document.querySelector("#pesquisa-produto");
if (inputPesquisa) {
    inputPesquisa.addEventListener("input", (event) => {
        const termo = event.target.value.toLowerCase().trim();
        const produtosFiltrados = todosOsProdutos.filter(p =>
            p.title.toLowerCase().includes(termo)
        );
        renderizarProdutos(produtosFiltrados);
    });
}

// G. Checkout (POST /buy)
const btnComprar = document.querySelector("#btn-comprar");
if (btnComprar) {
    btnComprar.addEventListener("click", () => {
        const cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
        const idsProdutos = cestoAtual.map(item => item.id);
        const isEstudante = document.querySelector("#estudante-deisi")?.checked || false;
        const cupao = document.querySelector("#cupao-desconto")?.value || "";

        const dadosCompra = {
            products: idsProdutos,
            student: isEstudante,
            coupon: cupao
        };

        fetch("https://deisishop.pw.deisi.ulusofona.pt/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCompra)
        })
            .then(response => response.json())
            .then(resultado => {
                const containerResultado = document.querySelector("#resultado-compra");
                if (!containerResultado) return;

                containerResultado.innerHTML = `
                <section>
                    <p><strong>Compra efetuada com sucesso!</strong></p>
                    <p>Total a pagar: <strong>${resultado.totalCost} €</strong></p>
                    <p>Referência para pagamento: <strong>${resultado.reference}</strong></p>
                </section>
            `;
            })
            .catch(error => console.error("Erro no checkout:", error));
    });
}

// H. Obter dados da API do DEISI Shop
fetch("https://deisishop.pw.deisi.ulusofona.pt/categories")
    .then(response => response.json())
    .then(categorias => {
        const selectFiltroCat = document.querySelector("#filtro-categoria");
        if (!selectFiltroCat) return;

        categorias.forEach(cat => {
            const option = document.createElement("option");
            const nomeCategoria = cat.name || cat.title || cat;
            option.value = nomeCategoria;
            option.textContent = nomeCategoria;
            selectFiltroCat.appendChild(option);
        });
    })
    .catch(error => console.error("Erro ao carregar categorias:", error));

fetch("https://deisishop.pw.deisi.ulusofona.pt/products")
    .then(response => response.json())
    .then(data => {
        todosOsProdutos = data;
        renderizarProdutos(todosOsProdutos);
        window.atualizaCesto();
    })
    .catch(error => console.error("Erro ao carregar produtos:", error));
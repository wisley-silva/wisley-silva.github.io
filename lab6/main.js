// A. declaração de variáveis

const nodeInputNumero = document.querySelector('input[type="number"]');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeSpanTotal = document.querySelector('#colecao span');

const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeSpanTotalRepetidos = document.querySelector('#repetidos span');

const colecao = JSON.parse(localStorage.getItem("colecaoCromos")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidosCromos")) || [];

// Renderização inicial ao abrir a página
atualizaLista(colecao, nodeUlColecao);
nodeSpanTotal.textContent = colecao.length;

atualizaLista(repetidos, nodeUlRepetidos);
nodeSpanTotalRepetidos.textContent = repetidos.length;

// B. event handlers

function guardaCarta() {
    const valorInput = nodeInputNumero.value;

    if (valorInput !== "") {
        const numero = Number(valorInput);

        if (colecao.includes(numero)) {
            // Se já existe na coleção, vai para os repetidos
            repetidos.push(numero);
            repetidos.sort((a, b) => a - b);

            atualizaLista(repetidos, nodeUlRepetidos);
            nodeSpanTotalRepetidos.textContent = repetidos.length;

            localStorage.setItem("repetidosCromos", JSON.stringify(repetidos));
        } else {
            // Se não existe, vai para a coleção principal
            colecao.push(numero);
            colecao.sort((a, b) => a - b);

            atualizaLista(colecao, nodeUlColecao);
            nodeSpanTotal.textContent = colecao.length;

            localStorage.setItem("colecaoCromos", JSON.stringify(colecao));
        }

        nodeInputNumero.value = "";
        nodeInputNumero.focus();
    }
}

function atualizaLista(listaCromos, elementoUl) {
    elementoUl.innerHTML = "";

    listaCromos.forEach((cromo) => {
        const nodeLi = document.createElement("li");

        if (elementoUl === nodeUlRepetidos) {
            nodeLi.innerHTML = `Cromo nº ${cromo} <button class="btn-eliminar" data-numero="${cromo}">Eliminar</button>`;
        } else {
            nodeLi.textContent = `Cromo nº ${cromo}`;
        }

        elementoUl.appendChild(nodeLi);
    });

    // Se for a lista de repetidos, associa o evento de clique aos botões de eliminar
    if (elementoUl === nodeUlRepetidos) {
        const botoesEliminar = elementoUl.querySelectorAll(".btn-eliminar");

        botoesEliminar.forEach((botao) => {
            botao.onclick = () => {
                const numeroParaRemover = Number(botao.dataset.numero);
                const indice = repetidos.indexOf(numeroParaRemover);

                if (indice !== -1) {
                    repetidos.splice(indice, 1);
                }

                atualizaLista(repetidos, nodeUlRepetidos);
                nodeSpanTotalRepetidos.textContent = repetidos.length;

                localStorage.setItem("repetidosCromos", JSON.stringify(repetidos));
            };
        });
    }
}

// C. event listeners

const form = document.querySelector('form');

if (form) {
    form.onsubmit = (event) => {
        event.preventDefault(); // Evita que a página faça refresh
        guardaCarta();
    };
}

// A. declaração de variáveis

const nodeInputNumero = document.querySelector('#colecao form input[type="number"]');
const nodeInputSubmit = document.querySelector('#colecao form input[type="submit"]');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeSpanTotal = document.querySelector('#colecao span');

const colecao = [];

// B. event handlers

function guardaCarta(){

    const numero = nodeInputNumero.value;

   if (numero !== "") {
        colecao.push(Number(numero));

        colecao.sort((a,b) => a - b);

        atualizaLista(colecao, nodeUlColecao);

        nodeSpanTotal.textContent = colecao.length;

        nodeInputNumero.value = "";
        nodeInputSubmit.focus();

    }
}


function atualizaLista(colecao, nodeUlColecao){

    nodeUlColecao.innerHTML = "";


    colecao.array.forEach((cromo) => {
        const nodeLi = document.createElement("li");
        nodeLi.textContent = `Cromo nº ${cromo}`;
        nodeUlColecao.appendChild(nodeLi);
    });
}

// C. event listeners

const form = document.querySelector('#colecao form');

form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};

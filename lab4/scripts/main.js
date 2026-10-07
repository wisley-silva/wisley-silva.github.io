// 1. Evento: Passar o rato por cima (mouseover e mouseout)
const passaTexto = document.getElementById('passa');

passaTexto.addEventListener('mouseover', () => {
    passaTexto.innerText = "1. Obrigado por passar!";
});

passaTexto.addEventListener('mouseout', () => {
    passaTexto.innerText = "1. Passa por aqui!";
});


// 2. Evento: Mudar cor do texto através de botões (click)
function mudarCor(cor) {
    const textoPinta = document.getElementById('texto-pinta');
    textoPinta.style.color = cor;
}


// 3. Evento: Trocar cor do fundo da caixa de texto ao digitar (keydown / keyup)
const campoEscrita = document.getElementById('campo-escrita');

campoEscrita.addEventListener('keydown', () => {
    campoEscrita.style.backgroundColor = '#e0f7fa';
});

campoEscrita.addEventListener('keyup', () => {
    campoEscrita.style.backgroundColor = '#ffffff';
});


// 4. Evento: Mudar a cor de fundo ao selecionar no seletor de cor (input)
const inputCor = document.getElementById('input-cor');

inputCor.addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
});


// 5. Evento: Contador incremental (click)
const btnConta = document.getElementById('btn-conta');
const spanContador = document.getElementById('contador');
let valorContador = 0;

btnConta.addEventListener('click', () => {
    valorContador++;
    spanContador.innerText = valorContador;
});

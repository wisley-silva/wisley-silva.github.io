// --- 1. EVENTO: click (Contador) ---
const btnConta = document.getElementById('btn-conta');
const spanContador = document.getElementById('contador');
let totalCliques = 0;

btnConta.addEventListener('click', () => {
    totalCliques++;
    spanContador.textContent = totalCliques;
    spanContador.style.color = totalCliques % 2 === 0 ? '#e74c3c' : '#2ecc71';
    spanContador.style.fontWeight = 'bold';
});

// --- 2. EVENTO: dblclick (Duplo clique) ---
const caixaDuplo = document.getElementById('caixa-duplo');

caixaDuplo.addEventListener('dblclick', () => {
    caixaDuplo.textContent = '⚡ Duplo clique detetado!';
    caixaDuplo.style.backgroundColor = '#9b59b6';
    caixaDuplo.style.color = '#ffffff';
    caixaDuplo.style.transform = 'scale(1.05)';
});

// --- 3 & 4. EVENTOS: mouseover e mouseout ---
const caixaHover = document.getElementById('caixa-hover');

caixaHover.addEventListener('mouseover', () => {
    caixaHover.textContent = '🎯 O rato está aqui dentro!';
    caixaHover.style.backgroundColor = '#f39c12';
    caixaHover.style.color = '#ffffff';
});

caixaHover.addEventListener('mouseout', () => {
    caixaHover.textContent = 'Passe o rato por cima!';
    caixaHover.style.backgroundColor = '#ffffff';
    caixaHover.style.color = '#333333';
});

// --- 5. EVENTO: mousemove ---
const areaMovimento = document.getElementById('area-movimento');
const coordsTexto = document.getElementById('coordenadas');

areaMovimento.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    coordsTexto.textContent = `Coordenadas: X: ${x}, Y: ${y}`;
    coordsTexto.style.color = `hsl(${(x + y) % 360}, 70%, 40%)`;
    areaMovimento.style.borderColor = `hsl(${x % 360}, 60%, 50%)`;
});

// --- EXTRA: Mudar fundo da página (input) ---
const inputCor = document.getElementById('input-cor');

inputCor.addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
});

// conjunto de cards do carrossel
const cards = ['<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 1 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>',
    '<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 2 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>',
    '<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 3 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>',
    '<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 4 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>',
    '<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 5 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>',
    '<div class="card"><div class="photo"><img src="./peitoral.webp" alt="" height="180px"></div><h3 class="nome">Coleira 6 Peitoral</h3><h4 class="preco">R$ 44,25</h4><button class="comprar">COMPRAR</button></div>'];

// selecionando os elementos do carrossel
const container = document.querySelector('.insideContainer');
const left = document.getElementById('setaL');
const right = document.getElementById('setaR');
const n = 6;
let indice = 0;

function preProcess(){
    /* Coloca os cards no carrossel */

    indice = n-1;
    let novo = getSlice(cards, n);
    novo = novo.reduce((tags,atual)=>{ return tags+atual});
    container.innerHTML = novo;
    
}

preProcess();

function getSlice(lista, n){

    /* Pega a fatia de indices do carrossel que devem ser exibidos na tela */

    let ini = indice;
    let fim = indice + n;
    let novo = lista.slice(ini,fim);
    
    if(fim > lista.length){
        novo = novo.concat(cards.slice(0,(fim-lista.length)));
    } 

    return novo;
}

function calcDesl(cartoes){

    /* Calcula quantos pixels o card deve ser deslocado para dar
    o efeito de movimentação dos cards */

    let tamCard = cartoes[0].offsetWidth;
    let tamDiv = container.offsetWidth;
    let prct = (tamCard/tamDiv);
    desl = 1.0 - (prct * n);
    desl = desl/(2*n - 2);
    desl = 2*desl + prct;
    desl *= tamDiv;
    desl = Math.round(desl)

    return desl;
}

function gira(val){

    /* Muda o índice para a esquerda ou para a direita dependendo
    do valor inserido. Pega uma nova fatia de elementos do carrossel
    e os reposiciona deslocados. */

    indice += val;
    indice = (indice + cards.length)%cards.length
    
    let novo = getSlice(cards, n);
    novo = novo.reduce((tags,atual)=>{ return tags+atual});
    container.innerHTML = novo;

    let cartoes = container.querySelectorAll('.card');
    desl = calcDesl(cartoes);

    cartoes.forEach(cartao => {
        cartao.classList.toggle('anima');
        if(val > 0){
            cartao.style.left = desl.toString() + 'px';
        }else{
            cartao.style.right = desl.toString() + 'px';
        }
    })    
}

function anima(val){

    /* Executa a transição que dá o efeito de mobilidade no carrossel */

    let cartoes = container.querySelectorAll('.card');
    desl = calcDesl(cartoes);

    cartoes.forEach(cartao => {
        cartao.style.transform = 'translate(' + (-val*desl).toString() + 'px)'
    })
}

// adiciona os eventos a cada seta

function setaClick(val){
    gira(val);
    setTimeout(() => anima(val), '1');
}

left.addEventListener("click", () => setaClick(1));
right.addEventListener("click", () => setaClick(-1));
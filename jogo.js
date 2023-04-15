var largura= 0, altura= 0, tempo= 15;
var nivel= window.location.search.replace('?', '').split('=')[1];
var criarMosquitoTemp= 1500;

if(nivel == 'facil'){
    criarMosquitoTemp= 2000;
}else if(nivel == 'normal'){
    criarMosquitoTemp= 1500;
}else if(nivel == 'medio'){
    criarMosquitoTemp= 1000;
}else{
    criarMosquitoTemp= 500;
};

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;
};

ajustaTamanhoPalcoJogo();

//elemento cronometro
var elementCronometro= document.getElementById('cronometro');
elementCronometro.innerHTML= tempo;

//function cronometro
var cronometro= setInterval(function(){
    tempo--;
    
    if( tempo < 0){
        clearInterval(cronometro); 
        clearInterval(criarMosca);
        window.location.href= 'vitoria.html'
    }else{
        elementCronometro.innerHTML= tempo;
    };

}, 1000);

//listas
const tamanhosMosquito= ['mosquitoPequeno', 'mosquitoMedio', 'mosquitoGrande'];
const ladosDiferentes= ['ladoEsquerda', 'ladoDireita']

//function de tamanho random do mosquito
function tamanhoRandom() {
    let indexRandom= Math.floor(Math.random() * 3);
    return tamanhosMosquito[indexRandom];
};

//function lado random do mosquito
function ladoRandom() {
    let indexRandom= Math.floor(Math.random() * 2);
    return ladosDiferentes[indexRandom];
};

//quantidade de vidas
var countVidas= 0;

//posicao aleatoria do mosquito
function posicaoRandom() {
    //remover o mosquito caso exista um
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();
        
        if(countVidas > 2){
            //game over
            window.location.href= 'fim-de-jogo.html';
        }else{
            //continua o jogo
            document.getElementsByClassName('vida-item')[countVidas].src= 'imagens/coracao_vazio.png';

            countVidas++;
        };
    };


    var posicaoX = Math.floor(Math.random() * largura) - 90, 
    posicaoY = Math.floor(Math.random() * altura) - 90;

    //controle da posicao
    posicaoX= posicaoX < 0 ? 0 : posicaoX;
    posicaoY= posicaoY < 0 ? 0 : posicaoY;

    //criar o elemento HTML
    let mosquito = document.createElement('img');
    mosquito.src= 'imagens/mosca.png';
    mosquito.classList.add(tamanhoRandom());
    mosquito.classList.add(ladoRandom());
    mosquito.style.position= 'absolute';
    mosquito.style.left= posicaoX + 'px';
    mosquito.style.top= posicaoY + 'px';
    mosquito.id= 'mosquito';

    mosquito.onclick= function(){
        this.remove();
    };

    //adicionar elemento no body
    document.body.appendChild(mosquito);
};

//criar mosca
var criarMosca= setInterval(function(){
    posicaoRandom();
}, criarMosquitoTemp);



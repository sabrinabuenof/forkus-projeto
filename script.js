const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll ('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconPlayPause = document.querySelector('.app__card-primary-button img');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio ('/sons/play.wav');
const audioPause = new Audio ('/sons/pause.mp3');
const audioBeep = new Audio ('/sons/beep.mp3');

let tempoDecorridosEmSegundos = 5;
let intervaloId = null; 

musica.loop = true; 

musicaFocoInput.addEventListener ('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto ('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto ('descanso-curto');
    curtoBt.classList.add ('active');
})


longoBt.addEventListener('click', () => {
    alterarContexto ('descanso-longo');
    longoBt.classList.add ('active');
})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<strong class="app__title-strong"> Faça um pausa curta!` 

            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça um pausa longa! 
            `   
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridosEmSegundos <= 0) {
        audioBeep.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridosEmSegundos -= 1;
    console.log('Temporizador: ' + tempoDecorridosEmSegundos);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {
    if (intervaloId) {
        audioPause.play();        
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconPlayPause.setAttribute('src', './imagens/pause.png');
    
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
    iconPlayPause.setAttribute('src', './imagens/play_arrow.png');
}




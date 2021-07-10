
let deck = [];
let tipos=['C','D','H','S'];
let especiales=['A','J','Q','K'];
let puntosJugador=0;
let puntosPc=0;


//html
const btnPedir = document.querySelector('#btnPedirCarta'); 
const btnStop = document.querySelector('#btnStop');
const btnNewGame=document.querySelector('#btnNewGame');
const puntosPlayer = document.querySelectorAll('small');
const ponerCarta = document.querySelector('.jugador-cartas');
const ponerCartaPc = document.querySelector('.pc-cartas');

const crearDeck=()=>{

    for(let i = 2; i<=10 ;i++){
     for(tipo of tipos){
         deck.push(i + tipo);
     }
    }
    for(tipo of tipos){
        for(esp of especiales){
            deck.push(esp + tipo);
        }
    }
   // console.log(deck);
    deck=_.shuffle(deck);  // _.shuffle para revolver arreglo 
    console.log(deck);   
    return deck;
}
crearDeck();

pedirCarta=()=>{

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}
//pedirCarta();

const valorCarta=(carta)=>{     //(pos inicial, pos final)
    const valor = carta.substring(0,carta.length - 1); //regresa un string en base a la posicion inicia y la final
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 
    : valor*1 
}
//const valor = valorCarta( pedirCarta() );

//TurnoPc
turnoPc=(puntosMinimos)=>{
    do{
    const carta = pedirCarta();
    puntosPc=puntosPc + valorCarta(carta);
    console.log(puntosPc);
    puntosPlayer[1].innerText=puntosPc;
 
    const imgCarta =document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    ponerCartaPc.append(imgCarta);

    if(puntosMinimos>21){
        break;
    }

    }while( (puntosPc<puntosMinimos) && (puntosMinimos<=21) );

    setTimeout(()=>{
        if(puntosMinimos==puntosPc){
            alert('draw');
            btnStop.disabled=true;
        }else if(puntosMinimos>21){
            alert('you have lost');
        }else if (puntosPc>21){
            alert('you have won');
      }else{
        alert('computer wins');
      }
    },100);
  
}

//eventos
// turno jugador
btnPedir.addEventListener('click',()=>{

    const carta = pedirCarta();
    
    puntosJugador=puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    puntosPlayer[0].innerText=puntosJugador;
 
    const imgCarta =document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    ponerCarta.append(imgCarta);

    if(puntosJugador >21){
        console.warn('you have lost')
        btnPedir.disabled=true;
        btnStop.disabled=true;
        turnoPc(puntosJugador);
    }else if(puntosJugador===21){
        console.warn('21 you have won')
        btnPedir.disabled=true;
        btnStop.disabled=true;
        turnoPc(puntosJugador);
    }
});

btnStop.addEventListener('click',()=>{

    btnPedir.disabled=true;
    btnStop.disabled=true;
    turnoPc(puntosJugador);
    
});

btnNewGame.addEventListener('click',()=>{
console.clear();

    deck=[];
    deck = crearDeck();
    

    puntosJugador=0;
    puntosPc=0;

    puntosPlayer[0].innerText=0;
    puntosPlayer[1].innerText=0;

    ponerCarta.innerHTML='';
    ponerCartaPc.innerHTML='';

    btnPedir.disabled=false;
    btnStop.disabled=false;
});
//patron madulo
const miModulo =(()=>{
    'use strict'
    
    let deck = [],
        puntosJugadores=[];
    const tipos=['C','D','H','S'],
          especiales=['A','J','Q','K'];
    
    
    
    //html
    const btnPedir = document.querySelector('#btnPedirCarta'),
          btnStop = document.querySelector('#btnStop'),
          btnNewGame=document.querySelector('#btnNewGame'),
          puntosPlayer = document.querySelectorAll('small'),
          divcrearCartas = document.querySelectorAll('#divCartas');

    const inicializarJuego=( numeroJugadores = 2)=>{
   
        deck=crearDeck();
        puntosJugadores=[];

    for(let i = 0; i<numeroJugadores; i++){
        puntosJugadores.push(0);
    }
    
        puntosPlayer.forEach(elem=>elem.innerText=0);
        divcrearCartas.forEach(elem=>elem.innerText='');
    
        btnPedir.disabled=false;
        btnStop.disabled=false;


    return puntosJugadores;
    }
    
    const crearDeck=()=>{
        deck=[];
        for(let i = 2; i<=10 ;i++){
         for(let tipo of tipos){
             deck.push(i + tipo);
         }
        }
        for(let tipo of tipos){
            for( let esp of especiales){
                deck.push(esp + tipo);
            }
        }
       // console.log(deck);
        // _.shuffle para revolver arreglo  
        return _.shuffle(deck);
    }
    
    const pedirCarta=()=>{
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return  deck.pop();
    }
    
    const valorCarta=(carta)=>{     //(pos inicial, pos final)
        const valor = carta.substring(0,carta.length - 1); //regresa un string en base a la posicion inicia y la final
        return (isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10 
        : valor*1 
    }
    
    const acomularPuntos=(carta , turno)=>{
      
        puntosJugadores[turno]=puntosJugadores[turno]+ valorCarta(carta);
        puntosPlayer[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta=(carta, turno)=>{
        const imgCarta =document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divcrearCartas[turno].append(imgCarta);
    }
    
    const determinarGanador=()=>{

        const [puntosMinimos , puntosPc]= puntosJugadores;
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


    //TurnoPc
   const turnoPc=(puntosMinimos)=>{

    let puntosPc = 0;

        do{
        const carta = pedirCarta();
        puntosPc = acomularPuntos(carta, puntosJugadores.length-1);
        crearCarta(carta, puntosJugadores.length-1);

    
        if(puntosMinimos>21){
            break;
        }
    
        }while( (puntosPc<puntosMinimos) && (puntosMinimos<=21) );
        determinarGanador();
      
    }
    
    //eventos
    // turno jugador
    btnPedir.addEventListener('click',()=>{
    
    const carta = pedirCarta();
       const puntosJugador= acomularPuntos(carta, 0);
       crearCarta(carta,0);
    
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
        turnoPc(puntosJugadores[0]);
        
    });
    
    btnNewGame.addEventListener('click',()=>{
        inicializarJuego();
    })

    return {
        newGame: inicializarJuego
    } 

})();
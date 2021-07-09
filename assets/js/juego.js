
let deck = [];
let tipos=['C','D','H','S'];
let especiales=['A','J','Q','K'];
let puntosJugador=0;
let puntosPc=0;


//html
const btnPedir = document.querySelector('#btnPedirCarta'); 
const puntosPlayer = document.querySelectorAll('small');
const ponerCarta = document.querySelector('.jugador-cartas')

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
}
crearDeck();

pedirCarta=()=>{
    if(deck != 0){
    const carta=deck.pop(); //sacar el ultimo elemento del array

    console.log(carta); 
    return carta ;  
    } else throw 'there arent more cards in the deck'    
}
//pedirCarta();

const valorCarta=(carta)=>{     //(pos inicial, pos final)
    const valor = carta.substring(0,carta.length - 1); //regresa un string en base a la posicion inicia y la final
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 
    : valor*1 
}
const valor = valorCarta( pedirCarta() );


//eventos

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
        console.warn('you have lose')
        btnPedir.disabled=true;
    }else if(puntosJugador==21){
        console.warn('21 you have win')
        btnPedir.disabled=true;
    }
});
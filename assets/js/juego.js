
let deck = [];
let tipos=['C','D','H','S'];
let especiales=['A','J','Q','K'];

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
    deck=_.shuffle(deck);  // sheffle para revolver arreglo 
    console.log(deck);   
}

crearDeck();


pedirCarta=()=>{
    if(deck != 0){
    const carta=deck.pop();
    console.log(deck);   
    console.log(carta); 
    return carta ;  
    } else throw 'there arent more cards in the deck'
    
}

//pedirCarta();

const valorCarta=(carta)=>{
    const valor = carta.substring(0,carta.length - 1);

    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 
    : valor*1 

}

const valor = valorCarta( pedirCarta() );
console.log({valor});
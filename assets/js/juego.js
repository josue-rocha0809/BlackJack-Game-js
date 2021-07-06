
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
    console.log(deck);
    deck=_.shuffle(deck);  // sheffle para revolver arreglo 
    console.log(deck);   
}

crearDeck();
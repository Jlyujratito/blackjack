let deck = [];
const suits = ['H', 'D', 'C', 'S'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];  
let cartaJugador;
let cartaComputadora;
let puntosJugador = 0;
let puntosComputadora = 0;
const puntosJugadorHTML = document.querySelectorAll('small');

const creardeck = () => {
    for (let suit of suits) {
        for (let value of values) {
            deck.push(value + suit);
        }
    }
    return _.shuffle(deck); 
}

const obtenerCarta = () => {
    return deck.pop();
}   

const valorCarta = (carta) => {
    const valor = carta.slice(0, -1);   
    if (isNaN(valor)) {
        return (valor === 'A') ? 11 : 10;
    }
    return parseInt(valor);
}
 
deck = creardeck();
console.log(deck);

const btnPedir = document.querySelector('#btn-pedir');
btnPedir.addEventListener('click', () => {
    cartaJugador = obtenerCarta();
    puntosJugador += valorCarta(cartaJugador);
    puntosJugadorHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${cartaJugador}.png`;
    imgCarta.classList.add('carta');
    document.querySelector('#jugador-cartas').appendChild(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
         turnoComputadora(puntosJugador);
    }
});
 const turnoComputadora = (puntosJugador)=>{
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    do{
        cartaComputadora = obtenerCarta();
        puntosComputadora += valorCarta(cartaComputadora);
        puntosJugadorHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${cartaComputadora}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.appendChild(imgCarta);
        if(puntosJugador > 21)
        {break;}
    }
    while(puntosComputadora <= puntosJugador && puntosComputadora < 21)
        
        setTimeout(() => {
                    if(puntosJugador > 21)
                    {   
                        alert('¡Perdiste! La computadora ganó.');
                    }else if (puntosComputadora <= 21 && (21 - puntosComputadora) < (21 - puntosJugador)) {
                        alert('Gana la Computadora');
                    }else if(puntosComputadora === puntosJugador){
                        alert('Nadie Gana');
                    }else{
                        alert('Ganaste');
                    }
        },1000 );
 
}
const btnDetener = document.querySelector('#btn-detener');
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});
const btnNuevoJuego = document.querySelector('#btn-jugar');
btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    deck = creardeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosJugadorHTML[0].innerText = puntosJugador;
    puntosJugadorHTML[1].innerText = puntosComputadora;
    document.querySelector('#jugador-cartas').innerHTML = '';
    document.querySelector('#computadora-cartas').innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
}); 






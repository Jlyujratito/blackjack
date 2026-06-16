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
    document.querySelector('#jugador-cartas').appendChild(imgCarta);  git   

    if (puntosJugador > 21) {
        alert('Perdiste, te pasaste de 21 puntos');
        btnPedir.disabled = true;
    }
    else if (puntosJugador === 21) {
        alert('Ganaste, tienes 21 puntos');
        btnPedir.disabled = true;
    }

});




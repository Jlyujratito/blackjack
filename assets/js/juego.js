(()=>{
    'use strict';

    const suits = ['H', 'D', 'C', 'S'],
          values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    let deck            = [],
        puntosJugadores = [];

    const btnPedir          = document.querySelector('#btn-pedir'),
          btnDetener        = document.querySelector('#btn-detener'),
          btnNuevoJuego     = document.querySelector('#btn-jugar'),
          puntosJugadorHTML = document.querySelectorAll('small'),
          divCartas         = document.querySelectorAll('.divCartas');
    
    
    const inicializarJuego = (cantidadJugadores = 2 ) => {
        deck = creardeck();
        puntosJugadores = [];
        for(let i=0;i< cantidadJugadores;i++){
            puntosJugadores.push(0);
            puntosJugadorHTML[i].innerText = 0;
            divCartas[i].innerHTML = '';
        }
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

    const creardeck = () => {
        const nuevoDeck = [];
        for (let suit of suits) {
            for (let value of values) {
                nuevoDeck.push(value + suit);
            }
        }
        return _.shuffle(nuevoDeck); 
    }

    const obtenerCarta = () => {
        if(deck.length === 0) throw new Error('No hay cartas en la baraja');
        return deck.pop();
    }   

    const valorCarta = (carta) => {
        const valor = carta.slice(0, -1);   
        if (isNaN(valor)) {
            return (valor === 'A') ? 11 : 10;
        }
        return parseInt(valor);
    }

    const insertarCartaHTML = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartas[turno].appendChild(imgCarta);
    }

    const acumularPuntos = (jugador)=> {
        const carta = obtenerCarta();
        puntosJugadores[jugador] += valorCarta(carta);
        puntosJugadorHTML[jugador].innerText = puntosJugadores[jugador];
        insertarCartaHTML(carta,jugador);
        return carta;   
    }

    const determinarGanador = ()=>{
        const [puntosJugador, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosJugador > 21) {   
                alert('¡Perdiste! La computadora ganó.');
            } else if (puntosComputadora > 21) {
                alert('¡Ganaste! La computadora se pasó de 21.');
            } else if (puntosComputadora === puntosJugador) {
                alert('Nadie Gana - Empate');
            } else if (puntosComputadora > puntosJugador) {
                alert('Gana la Computadora');
            } else {
                alert('¡Ganaste!');
            }
        },300 );
    }

    btnPedir.addEventListener('click', () => {      
        const puntosJugador = acumularPuntos(0);
        if (puntosJugadores[0] > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }
    });

    const turnoComputadora = (puntosJugador)=>{   
        const turnoPC = puntosJugadores.length - 1;
        do{
            acumularPuntos(turnoPC);
            if(puntosJugador > 21) break;
        }
        while(puntosJugadores[turnoPC] < puntosJugador && puntosJugadores[turnoPC] <= 21)
        determinarGanador();    
    };

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    inicializarJuego();
})();









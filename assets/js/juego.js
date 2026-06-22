(()=>{

    const suits = ['H', 'D', 'C', 'S'],
          values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
          puntosJugadorHTML = document.querySelectorAll('small'),
          divCartasComputadora = document.querySelector('#computadora-cartas');
    let deck = [],
        carta,
        puntosJugadores = [];
    
    const inicializarCarta = (cantidadJugadores ) => {
        deck = creardeck();
        puntosJugadores = [];
        for(i=0;i<= cantidadJugadores;i++)
            puntosJugadores.push(0);
        console.log(puntosJugadores);
        console.log(deck);
    }

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

    const btnPedir = document.querySelector('#btn-pedir');
    btnPedir.addEventListener('click', () => {      
        acumularPuntos(0);
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        document.querySelector('#jugador-cartas').appendChild(imgCarta);

        if (puntosJugadores[0] > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }
        else if (puntosJugadores[0] === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }
    });

    //jugador indica la posicion del arreglo de jugadores donde se esta acumulando
    const acumularPuntos = (jugador)=> {
        carta = obtenerCarta();
        puntosJugadores[jugador] += valorCarta(carta);
        puntosJugadorHTML[jugador].innerText = puntosJugadores[jugador];
        
    }

    const turnoComputadora = (puntosJugador)=>{   
        do{
            acumularPuntos(puntosJugadores.length-1);
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.appendChild(imgCarta);
            if(puntosJugador > 21)
            {break;}
        }
        while(puntosJugadores[puntosJugadores.length-1] <= puntosJugadores[0] && puntosJugadores[puntosJugadores.length-1] < 21)
            
            setTimeout(() => {
                        if(puntosJugador > 21)
                        {   
                            alert('¡Perdiste! La computadora ganó.');
                        }else if (puntosJugadores[puntosJugadores.length-1] <= 21 && (21 - puntosJugadores[puntosJugadores.length-1]) < (21 - puntosJugadores[0])) {
                            alert('Gana la Computadora');
                        }else if(puntosJugadores[puntosJugadores.length-1] === puntosJugadores[0]){
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
        turnoComputadora(puntosJugadores[0]);
    });
    const btnNuevoJuego = document.querySelector('#btn-jugar');
    btnNuevoJuego.addEventListener('click', () => {
        inicializarCarta(1);
        puntosJugadores.fill(0);
        puntosJugadorHTML[0].innerText = 0;
        puntosJugadorHTML[1].innerText = 0;
        document.querySelector('#jugador-cartas').innerHTML = '';
        document.querySelector('#computadora-cartas').innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }); 



    
})();









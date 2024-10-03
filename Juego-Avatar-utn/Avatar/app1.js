class Juego {
    constructor() {
        this.ataqueJugador = null;
        this.ataqueEnemigo = null;
        this.vidasJugador = 3;
        this.vidasEnemigo = 3;
        this.personajesDisponibles = ['Zuko', 'Katara', 'Aang', 'Toph', 'Iroh'];
        this.iniciarJuego();
    }

    iniciarJuego() {
        document.getElementById('seleccionar-ataque').style.display = 'none';
        document.getElementById('reiniciar').style.display = 'none';
        document.getElementById('reglas-del-juego').style.display = 'none';

        let botonPersonajeJugador = document.getElementById('boton-personaje');
        botonPersonajeJugador.addEventListener('click', () => this.seleccionarPersonajeJugador());

        let botonPunio = document.getElementById('boton-punio');
        botonPunio.addEventListener('click', () => this.ataque('Punio'));

        let botonPatada = document.getElementById('boton-patada');
        botonPatada.addEventListener('click', () => this.ataque('Patada'));

        let botonBarrida = document.getElementById('boton-barrida');
        botonBarrida.addEventListener('click', () => this.ataque('Barrida'));

        let botonReiniciar = document.getElementById('boton-reiniciar');
        botonReiniciar.addEventListener('click', () => this.reiniciarJuego());

        document.getElementById('boton-reglas').addEventListener('click', () => this.mostrarReglas());

        document.getElementById('boton-jugar').addEventListener('click', () => this.seleccionarPersonajeJugador());
    }

    mostrarReglas() {
        document.getElementById('reglas-del-juego').style.display = 'block';
        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('boton-reglas').style.display = 'none';
        document.getElementById('boton-jugar').style.display = 'block';
    }

    seleccionarPersonajeJugador() {
        document.getElementById('reglas-del-juego').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';

        let inputZuko = document.getElementById('zuko');
        let inputKatara = document.getElementById('katara');
        let inputAang = document.getElementById('aang');
        let inputToph = document.getElementById('toph');
        let spanPersonajeJugador = document.getElementById('personaje-jugador');

        if (inputZuko.checked) {
            spanPersonajeJugador.innerHTML = 'Zuko';
        } else if (inputKatara.checked) {
            spanPersonajeJugador.innerHTML = 'Katara';
        } else if (inputAang.checked) {
            spanPersonajeJugador.innerHTML = 'Aang';
        } else if (inputToph.checked) {
            spanPersonajeJugador.innerHTML = 'Toph';
        } else {
            this.mostrarMensajeError('Selecciona un personaje');
            return;
        }

        this.seleccionarPersonajeEnemigo();
        document.getElementById('seleccionar-ataque').style.display = 'block';
        document.getElementById('seleccionar-personaje').style.display = 'none';
    }

    mostrarMensajeError(mensaje) {
        let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
        let mensajeError = document.createElement('p');
        mensajeError.innerHTML = mensaje;
        mensajeError.style.color = 'red';

        sectionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
    }

    seleccionarPersonajeEnemigo() {
        let personajeAleatorio = this.aleatorio(1, this.personajesDisponibles.length);
        let spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
        spanPersonajeEnemigo.innerHTML = this.personajesDisponibles[personajeAleatorio - 1];
    }

    ataque(tipoAtaque) {
        this.ataqueJugador = tipoAtaque;
        this.ataqueEnemigo = this.generarAtaqueEnemigo();
        this.combate();
    }

    generarAtaqueEnemigo() {
        let ataqueAleatorio = this.aleatorio(1, 3);
        return ataqueAleatorio === 1 ? 'Punio' : ataqueAleatorio === 2 ? 'Patada' : 'Barrida';
    }

    combate() {
        let spanVidasJugador = document.getElementById('vidas-jugador');
        let spanVidasEnemigo = document.getElementById('vidas-enemigo');

        if (this.ataqueEnemigo === this.ataqueJugador) {
            this.crearMensaje('EMPATE');
        } else if (
            (this.ataqueJugador === 'Punio' && this.ataqueEnemigo === 'Barrida') ||
            (this.ataqueJugador === 'Patada' && this.ataqueEnemigo === 'Punio') ||
            (this.ataqueJugador === 'Barrida' && this.ataqueEnemigo === 'Patada')
        ) {
            this.crearMensaje('GANASTE');
            this.vidasEnemigo--;
            spanVidasEnemigo.innerHTML = this.vidasEnemigo;
        } else {
            this.crearMensaje('PERDISTE');
            this.vidasJugador--;
            spanVidasJugador.innerHTML = this.vidasJugador;
        }

        this.revisarVidas();
    }

    revisarVidas() {
        if (this.vidasEnemigo === 0) {
            this.crearMensajeFinal('FELICITACIONES!!! HAS GANADO 🤩🥳🎉');
        } else if (this.vidasJugador === 0) {
            this.crearMensajeFinal('QUE PENA, HAS PERDIDO 😢😭😭😭');
        }
    }

    crearMensaje(resultado) {
        let sectionMensaje = document.getElementById('mensajes');
        let parrafo = document.createElement('p');
        parrafo.innerHTML = `Tu personaje atacó con ${this.ataqueJugador}, el enemigo atacó con ${this.ataqueEnemigo}. ${resultado}`;
        sectionMensaje.appendChild(parrafo);
    }

    crearMensajeFinal(resultado) {
        let sectionReiniciar = document.getElementById('reiniciar');
        sectionReiniciar.style.display = 'block';

        let sectionMensaje = document.getElementById('mensajes');
        let parrafo = document.createElement('p');
        parrafo.innerHTML = resultado;

        sectionMensaje.appendChild(parrafo);

        document.getElementById('boton-punio').disabled = true;
        document.getElementById('boton-patada').disabled = true;
        document.getElementById('boton-barrida').disabled = true;
    }

    reiniciarJuego() {
        location.reload();
    }

    aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

window.addEventListener('load', () => new Juego());


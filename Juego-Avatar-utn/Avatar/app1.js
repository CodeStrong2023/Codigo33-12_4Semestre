class Personaje {
    constructor(nombre, vidas = 3) {
        this.nombre = nombre;
        this.vidas = vidas;
    }

    recibirAtaque() {
        this.vidas--;
    }

    estaVivo() {
        return this.vidas > 0;
    }
}

class Juego {
    constructor() {
        this.jugador = null;
        this.enemigo = null;
        this.ataqueJugador = null;
        this.ataqueEnemigo = null;
        this.personajesDisponibles = ['Zuko', 'Katara', 'Aang', 'Toph', 'Iroh']; // Incluí a Iroh
    }

    iniciarJuego() {
        document.getElementById('seleccionar-ataque').style.display = 'none';
        document.getElementById('reiniciar').style.display = 'none';
        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-personaje').addEventListener('click', () => this.seleccionarPersonajeJugador());
        document.getElementById('boton-reglas').addEventListener('click', this.mostrarReglas);
        document.getElementById('boton-jugar').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';

        document.getElementById('boton-punio').addEventListener('click', () => this.elegirAtaque('Puño'));
        document.getElementById('boton-patada').addEventListener('click', () => this.elegirAtaque('Patada'));
        document.getElementById('boton-barrida').addEventListener('click', () => this.elegirAtaque('Barrida'));
        document.getElementById('boton-reiniciar').addEventListener('click', this.reiniciarJuego);
    }

    mostrarReglas() {
        document.getElementById("reglas-del-juego").style.display = "block";
        document.getElementById('boton-jugar').style.display = 'block';
        document.getElementById('boton-reglas').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('boton-jugar').addEventListener('click', () => this.seleccionarPersonajeJugador());
    }

    seleccionarPersonajeJugador() {
        const personajes = {
            'zuko': 'Zuko',
            'katara': 'Katara',
            'aang': 'Aang',
            'toph': 'Toph',
            'iroh': 'Iroh' // Añadido Iroh
        };

        let personajeSeleccionado = null;
        for (let key in personajes) {
            let inputPersonaje = document.getElementById(key);
            if (inputPersonaje.checked) {
                personajeSeleccionado = personajes[key];
                break;
            }
        }

        if (personajeSeleccionado) {
            this.jugador = new Personaje(personajeSeleccionado);
            document.getElementById('personaje-jugador').innerHTML = personajeSeleccionado;
            this.seleccionarPersonajeEnemigo();
        } else {
            this.mostrarError('Selecciona un personaje');
        }
    }

    seleccionarPersonajeEnemigo() {
        const enemigoAleatorio = this.personajesDisponibles[this.aleatorio(0, this.personajesDisponibles.length - 1)];
        this.enemigo = new Personaje(enemigoAleatorio);
        document.getElementById('personaje-enemigo').innerHTML = enemigoAleatorio;
        document.getElementById('seleccionar-ataque').style.display = 'block';
        document.getElementById('seleccionar-personaje').style.display = 'none';
    }

    elegirAtaque(ataque) {
        this.ataqueJugador = ataque;
        this.ataqueAleatorioEnemigo();
        this.combate();
    }

    ataqueAleatorioEnemigo() {
        const ataques = ['Puño', 'Patada', 'Barrida'];
        this.ataqueEnemigo = ataques[this.aleatorio(0, ataques.length - 1)];
    }

    combate() {
        let resultado;
        if (this.ataqueEnemigo === this.ataqueJugador) {
            resultado = "EMPATE";
        } else if (
            (this.ataqueJugador === 'Puño' && this.ataqueEnemigo === 'Barrida') ||
            (this.ataqueJugador === 'Patada' && this.ataqueEnemigo === 'Puño') ||
            (this.ataqueJugador === 'Barrida' && this.ataqueEnemigo === 'Patada')
        ) {
            resultado = "GANASTE";
            this.enemigo.recibirAtaque();
        } else {
            resultado = "PERDISTE";
            this.jugador.recibirAtaque();
        }

        this.crearMensaje(`Tu personaje atacó con ${this.ataqueJugador}, el enemigo atacó con ${this.ataqueEnemigo}. ${resultado}`);
        this.actualizarVidas();
        this.revisarVidas();
    }

    actualizarVidas() {
        document.getElementById('vidas-jugador').innerHTML = this.jugador.vidas;
        document.getElementById('vidas-enemigo').innerHTML = this.enemigo.vidas;
    }

    revisarVidas() {
        if (!this.enemigo.estaVivo()) {
            this.crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
            this.deshabilitarBotones();
        } else if (!this.jugador.estaVivo()) {
            this.crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭");
            this.deshabilitarBotones();
        }
    }

    crearMensaje(mensaje) {
        const sectionMensaje = document.getElementById('mensajes');
        const parrafo = document.createElement('p');
        parrafo.innerHTML = mensaje;
        sectionMensaje.appendChild(parrafo);
    }

    crearMensajeFinal(mensaje) {
        this.crearMensaje(mensaje);
        document.getElementById('reiniciar').style.display = 'block';
    }

    deshabilitarBotones() {
        document.getElementById('boton-punio').disabled = true;
        document.getElementById('boton-patada').disabled = true;
        document.getElementById('boton-barrida').disabled = true;
    }

    mostrarError(mensaje) {
        const sectionPersonaje = document.getElementById('seleccionar-personaje');
        const mensajeError = document.createElement('p');
        mensajeError.innerHTML = mensaje;
        mensajeError.style.color = 'red';
        sectionPersonaje.appendChild(mensajeError);
        setTimeout(() => sectionPersonaje.removeChild(mensajeError), 2000);
    }

    reiniciarJuego() {
        location.reload();
    }

    aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

window.addEventListener('load', () => {
    const juego = new Juego();
    juego.iniciarJuego();
});

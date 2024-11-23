// Clase base "Animal"
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    // Método común para comer
    comer() {
        console.log(`${this.nombre} está comiendo.`);
    }

    // Método común para sonido (debe ser sobrescrito por las subclases)
    sonido() {
        throw new Error("El método 'sonido()' debe ser implementado por cada subclase.");
    }
}

// Subclase "Perro"
class Perro extends Animal {
    sonido() {
        console.log(`${this.nombre} dice: ¡Guau Guau!`);
    }
}

// Subclase "Gato"
class Gato extends Animal {
    sonido() {
        console.log(`${this.nombre} dice: ¡Miau Miau!`);
    }
}

// Subclase "Pájaro"
class Pajaro extends Animal {
    sonido() {
        console.log(`${this.nombre} dice: ¡Pío Pío!`);
    }
}

// Función para interactuar con los animales
function interactuarConAnimales(animales) {
    animales.forEach(animal => {
        animal.comer();
        animal.sonido();
    });
}

// Crear instancias de diferentes animales
const perro = new Perro("Rex");
const gato = new Gato("Misha");
const pajaro = new Pajaro("Piolín");

// Lista de animales
const listaAnimales = [perro, gato, pajaro];

// Interactuar con ellos
interactuarConAnimales(listaAnimales);

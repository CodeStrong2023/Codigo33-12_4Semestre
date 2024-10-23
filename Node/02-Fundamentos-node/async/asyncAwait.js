async function hola(nombre) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hola, ' + nombre) 
            resolve(nombre)  
        }, 1000);
    }); 
}

async function hablar(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log("bla bla bla")
            resolve(nombre);
        }, 1000);
    });
}

async function adios(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('Adios, '+ nombre)
            resolve();
            //reject('Hay un error')
        }, 1000);
    });
}

//await hola('Ariel');
//await solo se puede usar en una funcion async
//async function main() {
   // let nombre = await hola('Ariel');
  //  await hablar();
//    await hablar();
    //await hablar();
    //await adios(nombre);
  //  console.log('Terminamos el proceso...');
//}

//console.log('Empezamos el proceso...');
//main();
//console.log('Esta va a ser la segunda instrucción');


//Codigo en ingles
async function hello(name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Hello, ' + name); 
            resolve(name);  
        }, 1000);
    }); 
}

async function talk(name) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log("bla bla bla");
            resolve(name);
        }, 1000);
    });
}

async function goodbye(name) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('Goodbye, ' + name);
            resolve();
            //reject('There is an error');
        }, 1000);
    });
}

// await hello('Ariel');
// await can only be used inside an async function
async function main() {
    let name = await hello('Ariel');
    await talk();
    await talk();
    await talk();
    await goodbye(name);
    console.log('We finished the process...');
}

console.log('We are starting the process...');
main();
console.log('This is going to be the second instruction');

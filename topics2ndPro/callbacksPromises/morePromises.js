/*

object that manages asynchronous operations
wrap aound a 
 */

/*function walkDog(callback){

    setTimeout(()=>{
        console.log("You walk the dog");
        callback();
    },  1500);
}

function cleanKitchen(callback){

    setTimeout(()=>{
        console.log("You clean the kitchen");
        callback();
    },  2500);
}

function takeOutTrash(callback){

    setTimeout(()=>{
        console.log("You take out the trash");
        callback();
    },  500);
}

walkDog(()=>{
    cleanKitchen(()=>{
        takeOutTrash(()=>{
            console.log("You finished all the chores!")
        })
    })
})*/

// using promises avoids callbacks

function walkDog(callback){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        const dogWalked = false;

        if(dogWalked){
            resolve("You walk the dog");
        }
        else{
            reject("You DIDN'T walk the dog")
        }
        
    },  1500);
    })
}

function cleanKitchen(callback){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

        const cleanedKitchen = false;

        if(cleanedKitchen){
            resolve("You clean the kitchen");
        }
        else{
            reject("You DIDN'T clean the kitchen");
        }
    },  2500);
    })
}

function takeOutTrash(callback){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            
         const trashTakenOut = false;

        if(trashTakenOut){
            resolve("You take out the trash");
        }
        else{
            reject("You DIDN'T take out the trash");
        }

        },  500);
    })
}

walkDog().then(value => {console.log(value); return cleanKitchen()})
    .then(value=>{console.log(value); return takeOutTrash()})
    .then(value => {console.log(value);console.log("You finished all the chores!")})
    .catch(error => console.log(error));

console.log("Holaaaaaaa")


/* Catch y then 

then tiene dos argumentos: uno para exito y otro para error:

    promise.then(
  function(result) {  manejar un resultado exitoso  },
  function(error) {  manejar un error }
);
    
*/

/*let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("hecho!"), 1000);
});*/

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("vaya!")), 1000);
});  
promise.catch(alert); // same as then but with null as first argument and errorHandlingFunction as second 

// resolve ejecuta la primera función en .then
promise.then(
  result => alert(result), // muestra "hecho!" después de 1 segundo
  error => alert(error) // no se ejecuta
);



// finally structure 

/*
    new Promise((resolve, reject) => {
  // hacer algo para tomar tiempo y luego llamar a resolve o reject
})
  // se ejecuta cuando la promesa quedó establecida, no importa si con éxito o no
  .finally(() => stop loading indicator)
  // así el indicador de carga siempre es detenido antes de que sigamos adelante
  .then(result => show result, err => show error)
*/


new Promise((resolve, reject) => {
  setTimeout(() => resolve("valor"), 2000)
})
  .finally(() => alert("Promesa lista")) // se dispara primero
  .then(result => alert(result)); // <-- .luego muestra "valor"



  new Promise((resolve, reject) => {
  throw new Error("error holis");
})
  .finally(() => alert("Promesa lista"))  // primero dispara
  .catch(err => alert(err));  

/*Si una promesa está pendiente, los manejadores .then/catch/finally esperan por su resolución.

Podría pasar a veces que, cuando agregamos un manejador, la promesa ya se encuentre establecida.

En tal caso, estos manejadores simplemente se ejecutarán de inmediato:
*/


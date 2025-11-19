console.log(`Hola Mundo!`);

const operation = (numero1, numero2, callback) =>
{
    return callback(numero1, numero2);
}

console.log(operation(1, 3, (a, b) => a+b));
console.log(operation(1, 3, (a, b) => a*b));
console.log(operation(1, 3, (a, b) => a-b));

/*
- funciones pueden ser pasadas como parametros

callback es mandar de vuelta la llamada (no es una kw)
con la informacion que he calculado. Es una llamada de vuelta

*/
// ejecutar de forma asincrona 
const operationa = (numero1, numero2, callback) =>
{
    return setTimeout(()=>{
        callback(numero1, numero2)
    }, 500)
}

operationa(1, 3, (a, b) =>{
    console.log(a+b);
});


const doAsyncStuff = (numero1, numero2, callback)=>
    {
        const resultado = numero1 + numero2;
        return setTimeout(()=>{
            callback(resultado);
        }, 500)
    }

doAsyncStuff(8, 5, (result)=>{
    console.log(result);
})
//----------------------------------

//promises
console.log("PROMISES");
console.log("Do before stuff with promises");

const doAsyncStuffWithPromises = (numero1, numero2)=>
    {
        const resultado = numero1 + numero2;
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve(resultado)
            },2000)
        })
    }

doAsyncStuffWithPromises(10, 10)
    .then(result=>console.log(result))
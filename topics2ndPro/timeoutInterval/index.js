function saludo(nombre)
{
    console.log(`Hola ${nombre}, buenos dias`)
}

//setTimeout(saludo, 3000, `David`); // si usas saludo() no esperara el tiempo determinado
 
// cancel execution of setTimeout with clearTimeout
// saves de timeOut in a variable to use it later
let temporizadorID = setTimeout(saludo, 3000, `David`);
clearTimeout(temporizadorID);


//execute the function every x amount of time
//setInterval(function, ms, arg1, arg2, ...)

/*
sintaxis normal
let numero = 5;
function conteo()
{
    console.log(`Lanzamiento en ${numero} segundos`);
    numero--;

    if(numero == -1)
    {
        clearInterval(lanzamiento);
    }
}
let lanzamiento = setInterval(conteo, 1000);
*/

// sintaxis de funcion flecha, mas comun 
/*let numero = 5;
let lanzamiento = setInterval(()=>{
    console.log(`Lanzamiento en ${numero} segundos`);
    numero--;

    if(numero == -1)
    {
        clearInterval(lanzamiento);
    }
}, 1000);*/

let numero = 0;
/*function incremento()
{
    console.log(numero);
    numero++;
    incrementoID = setTimeout(incremento, 1000);
}*/

let incrementoID = setTimeout(function incremento()
{
    console.log(numero);
    numero++;
    incrementoID = setTimeout(incremento, 1000);
}, 1000);
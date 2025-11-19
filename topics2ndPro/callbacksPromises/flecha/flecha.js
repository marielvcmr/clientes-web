// classic declaration

function saludar(nombre){
    return 'Hola '+nombre;
}

console.log(saludar("David"));

/*Hoisting: una funcion la puedo llamar en cualquier parte del codigo, 
antes o despues de haberla declarado*/


/* funciones anonimas: funciones normales, pero que no
tienen un nombre, por lo tanto son guardadas en una variable
 para poderlas llamar despues . Estas funciones no gozan del concepto de hoisting*/

 let saludos = function(nombre){
    return 'Saludos ' + nombre;
 }
 console.log(saludos("Ana"));

 // Funciones flecha estructura ()=>{}

/* Caracteristicas: 
-Son anonimas: para poderlas declarar necesito
almacenarlas en una variable para poderlas llamar despues

- No necesitan de la keyword function, o la kw return
- 1 parametro, se puede omitir parentesis
- 1 linea de bloque de codigo, omitir llaves
- permite optimizar el codigo
- parameterless usa parentesis ()
- objeto a retornar tiene {}, debe ser envuelto en parentesis
- {} imlica bloque de codigo, no return, por lo tanto si se
desea retornar algo debe usar la kw return 
- llamada a nombre de funcion flecha sin parametros debe tener parentesis
*/

let salu2 = (nombre)=>{return 'Saludos ' + nombre;};
let suma = (a, b)=> a+b;
let obj = () => ({nombre: 'Bob', edad: 20});

console.log(obj().nombre);
console.log(suma(1, 4,));
console.log(salu2("ko"));

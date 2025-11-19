/*fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => console.log(json))*/

const urlUsuarios = "https://jsonplaceholder.typicode.com/users"
const listaUsuarios = document.querySelector("#lista-usuarios")


fetch(urlUsuarios)
.then(response=>response.json())
.then(data=> {
    console.log(data[0])
})  //does it return an arrayList of jsons


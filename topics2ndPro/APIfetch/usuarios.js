/*fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => console.log(json))*/

const urlUsuarios = "https://jsonplaceholder.typicode.com/users"
const listaUsuarios = document.querySelector("#lista-usuarios")


fetch(urlUsuarios)
.then(response=>response.json())
.then((data)=> {

    data.forEach(usuario => {
        const li = document.createElement("li");
        li.innerHTML = usuario.name + "<br>Telefono: " + usuario.phone;
        listaUsuarios.append(li);
    });
}) 





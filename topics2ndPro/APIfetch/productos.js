const listaProductos = document.querySelector("#lista-productos");

fetch("productos.json")
.then(response => response.json())
.then(data=>{
    mostrarProductos(data);
})

function mostrarProductos(data)
{
    data.forEach(element => {
        const li = document.createElement("li");
        li.innerText = element.nombre + " - $"+ element.precio
        listaProductos.append(li)
    });
}

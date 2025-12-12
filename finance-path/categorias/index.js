import { Header, SidebarItem } from "../componentes/index.js";
class ButtonWithImage {
  constructor(label, link, onClick = null) {
    this.label = label;
    this.link = link;
    this.onClick = onClick;

    // Crear raíz
    this.root = document.createElement("div");
    this.root.className = "btn-with-image"; // clase nueva

    // Contenedor de la imagen
    if (this.link) {
      const img = document.createElement("img");
      img.src = this.link;
      img.alt = "";
      img.className = "btn-icon";
      this.root.appendChild(img);
    }

    // Texto
    const span = document.createElement("span");
    span.textContent = this.label;
    this.root.appendChild(span);

    // Evento click si existe
    this.root.addEventListener("click", this.onClick);
    this.root.style.cursor = "pointer";
    
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}

//Composición final

const appCat = document.getElementById("appCat");

new Header().render(appCat);

// NUEVO CONTENEDOR PARA ROW PRINCIPAL
const mainRow = document.createElement("div");
mainRow.className = "main-row";
appCat.appendChild(mainRow);

const sidebar=document.createElement("aside");
sidebar.className = "sidebar";

const main = new SidebarItem('MAIN', '../dashboard/index.html');
main.id='main';
main.render(sidebar);

const categorias = new SidebarItem('CATEGORIAS', 'index.html');
categorias.id='categorias';
categorias.render(sidebar);

const transacciones = new SidebarItem('TRANSACCIONES', '../transacciones/index.html');
transacciones.id='transacciones';
transacciones.render(sidebar);

const presupuestos = new SidebarItem('PRESUPUESTOS', '../presupuestos/index.html');
presupuestos.id='presupuestos';
presupuestos.render(sidebar);


mainRow.appendChild(sidebar);


// Pantalla principal a la derecha
const dashboardScreen = document.createElement("div");
dashboardScreen.className = "dashboard-screen";
mainRow.appendChild(dashboardScreen);
//

const masCategoria = document.createElement("div");
masCategoria.className= 'masCategoria';
const setCategorias = document.createElement("div");

dashboardScreen.appendChild(masCategoria);
dashboardScreen.appendChild(setCategorias)

const masCategoriaBtn= new ButtonWithImage('Añadir categoría','../imgs/plus.png', ()=>{window.alert("Anadir")});
masCategoriaBtn.render(masCategoria);
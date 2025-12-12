import { Header, SidebarItem } from "../componentes/index.js";

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
const setCategorias = document.createElement("div");

dashboardScreen.appendChild(masCategoria);
dashboardScreen.appendChild(setCategorias)

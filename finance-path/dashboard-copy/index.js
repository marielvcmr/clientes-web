import { SidebarItem } from "../components.js"
import { Header } from "../components.js";
import { Dropdown } from "../components.js";
import { ChartCard } from "../component.js";
import { Dashboard } from "../component.js";
import { primerosDiezDesde } from "../utils.js";
import { Button } from "../components.js";
import{ Sidebar } from "../components.js";


////////////////////////////
//Composición final

const app = document.getElementById("app");

new Header().render(app);

// NUEVO CONTENEDOR PARA ROW PRINCIPAL
const mainRow = document.createElement("div");
mainRow.className = "main-row";
app.appendChild(mainRow);


const sidebar=document.createElement("aside");
sidebar.className = "sidebar";

const main = new SidebarItem('MAIN', 'index.html');
main.id='main';
main.render(sidebar);

const categorias = new SidebarItem('CATEGORIAS', '../categorias/index.html');
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

// 1. Mensaje inicial
const welcome = document.createElement("div");
welcome.className = "welcome-box";
welcome.style.margin= '0px';
welcome.style.backgroundColor='transparent';
welcome.innerHTML = `
  <h2 style="font-family: 'Vujahday';font-size: 40px; margin: 5px;">¡Bienvenido a tu gestor de finanzas!</h2>
  <h1 style="font-family: 'Manrope'; font-size: 40px; margin: 5px;">FINANCEPATH</h1>
`;
dashboardScreen.appendChild(welcome);

const Filters= document.createElement("div");
Filters.className = "filtros";

dashboardScreen.appendChild(Filters);
const años= primerosDiezDesde(2025);

const month_Filter = new Dropdown('MES', ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'])
month_Filter.root.id='month_Filter';

const ano_Filter = new Dropdown('AÑO', años);
ano_Filter.root.id= 'ano_Filter';

const aplicar_btn= new Button('APLICAR', ()=>{window.alert('aplicado');});

month_Filter.render(Filters);
ano_Filter.render(Filters);
aplicar_btn.render(Filters);

// 3. Dashboard (grid)
const dashboard = new Dashboard();
dashboard.render(dashboardScreen);

dashboard.addCard(new ChartCard("Gastos por categoría (Dona)"));
dashboard.addCard(new ChartCard("Evolución balance mensual"));
dashboard.addCard(new ChartCard("Gastos vs Ingresos"));
dashboard.addCard(new ChartCard("Balance real vs estimado"));

///////////////////////ACCIONES///////////////////////////////////
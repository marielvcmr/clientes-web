import { Header, SidebarItem, Title, filterWithImage } from "../componentes/index.js";

class dataCard {
    constructor(name, number, imgLink) {
        this.name = name;
        this.number = number;
        this.imgLink = imgLink;

        // ----- ROOT -----
        this.root = document.createElement('div');
        this.root.className = 'data-card';

        // ----- Título -----
        const titleCard = document.createElement('div');
        titleCard.textContent = this.name;
        titleCard.className = 'title-card';

        // ----- Contenido -----
        const contentCard = document.createElement('div');
        contentCard.className = 'content-card';

        const imgData = document.createElement('img');
        imgData.src = this.imgLink;

        const numData = document.createElement('p');
        numData.textContent = this.number;

        // Armado visual
        contentCard.appendChild(imgData);
        contentCard.appendChild(numData);

        // Agregar todo a la tarjeta
        this.root.appendChild(titleCard);
        this.root.appendChild(contentCard);
    }

    render(parent) {
        parent.appendChild(this.root);
    }
}




/////////PANTALLA//////////////////////////////////////////////
const appTrans = document.getElementById("appTrans");

new Header().render(appTrans);

// NUEVO CONTENEDOR PARA ROW PRINCIPAL
const mainRow = document.createElement("div");
mainRow.className = "main-row";
appTrans.appendChild(mainRow);

const sidebar=document.createElement("aside");
sidebar.className = "sidebar";

const main = new SidebarItem('MAIN', '../dashboard/index.html');
main.id='main';
main.render(sidebar);

const categorias = new SidebarItem('CATEGORIAS', '../categorias/index.html');
categorias.id='categorias';
categorias.render(sidebar);

const transacciones = new SidebarItem('TRANSACCIONES', 'index.html');
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

const startTrans = document.createElement("div");
startTrans.className = "start-Trans";
dashboardScreen.appendChild(startTrans);
const startTransMsg = new Title('Transacciones');
startTransMsg.render(startTrans);

const dataTrans = document.createElement("div");
dataTrans.className = "data-Trans";
dashboardScreen.appendChild(dataTrans);


const panelTrans = document.createElement("div");
panelTrans.className = "panel-Trans";
dashboardScreen.appendChild(panelTrans);

///////////////////////data////////////////////////
const ingresosCard = new dataCard('Ingresos', 50, '../imgs/ingreso1.png');
ingresosCard.render(dataTrans);
const egresosCard = new dataCard('Egresos', 50, '../imgs/egreso.png');
egresosCard.render(dataTrans);
const balanceCard = new dataCard('Balance', 50, '../imgs/balance.png');
balanceCard.render(dataTrans);

///////////////////////filters////////////////////////

const Agregar = new filterWithImage('Agregar', '../imgs/add.png', ()=>{window.alert("Agregar");})
Agregar.render(panelTrans);

const Filtrar = new filterWithImage('Filtrar', '../imgs/filter1.png', ()=>{window.alert("Filtrar");})
Filtrar.render(panelTrans);
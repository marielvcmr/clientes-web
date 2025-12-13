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




//table//
class TablaTransacciones {

    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);

        this.container.innerHTML = "";

        // contador interno de IDs
        this.nextId = 1;

        // crear tabla principal
        this.tabla = document.createElement("div");
        this.tabla.className = "tabla-container";

        // agregar header
        this.tabla.appendChild(this._crearHeader());

        // meter tabla en el contenedor
        this.container.appendChild(this.tabla);
    }


    // ---------------------------
    // MÉTODO PARA AGREGAR FILAS
    // ---------------------------
    agregar(item) {
        // asignar ID automáticamente
        const itemConId = {
            id: this.nextId++,
            ...item
        };

        const fila = this._crearFila(itemConId);
        this.tabla.appendChild(fila);
    }


    // ---------------------------
    // HEADER
    // ---------------------------
    _crearHeader() {
        const h = document.createElement("div");
        h.className = "tabla-header";

        h.innerHTML = `
            <div>ID</div>
            <div>Fecha</div>
            <div>Descripcion</div>
            <div>Categoria</div>
            <div>Tipo</div>
            <div>Monto</div>
            <div>Opciones</div>
        `;

        return h;
    }


    // ---------------------------
    // CREAR FILA
    // ---------------------------

    _crearFila(item) {
    const row = document.createElement("div");
    row.className = "tabla-row";

    row.innerHTML = `
        <div class="col-id">${item.id}</div>
        <div class="col-fecha">${item.fecha}</div>
        <div class="col-desc">${item.descripcion}</div>
        <div class="col-cat">${item.categoria}</div>
        <div class="col-tipo">${item.tipo}</div>
        <div class="col-monto">${item.monto}</div>

        <div class="col-acciones">
            <span class="btn-accion btn-edit"><img src = "../imgs/edit1.png"></span>
            <span class="btn-accion btn-delete"><img src = "../imgs/delete1.png"></span>
        </div>
    `;
        return row;
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

const tablaTrans = document.createElement("div");
tablaTrans.className = "tabla-Trans";
dashboardScreen.appendChild(tablaTrans);
tablaTrans.id= 'tabla-Trans';

///////////////////////data////////////////////////
const ingresosCard = new dataCard('Ingresos', 50, '../imgs/ingreso1.png');
ingresosCard.render(dataTrans);
const egresosCard = new dataCard('Egresos', 50, '../imgs/egreso.png');
egresosCard.render(dataTrans);
const balanceCard = new dataCard('Balance', 0, '../imgs/balance.png');
balanceCard.render(dataTrans);

///////////////////////filters////////////////////////

const searchBar = document.createElement('div');
searchBar.className = 'search-bar';

const lupa = document.createElement('img');
lupa.src = "../imgs/search.png";  
searchBar.appendChild(lupa);

const textInput = document.createElement('input');
textInput.type = 'text';         
textInput.className = 'text-input';
searchBar.appendChild(textInput);

panelTrans.appendChild(searchBar);

const Agregar = new filterWithImage('Agregar', '../imgs/add.png', ()=>{window.alert("Agregar");})
Agregar.render(panelTrans);

const Filtrar = new filterWithImage('Filtrar', '../imgs/filter1.png', ()=>{window.alert("Filtrar");})
Filtrar.render(panelTrans);

//////////////////////////tabla/////////////////////////////////////////
const tabla = new TablaTransacciones("tabla-Trans");
tabla.agregar({
    fecha: "12/2/25",
    descripcion: "Arroz",
    categoria: "Alimentacion",
    tipo: "Ingreso",
    monto: 20
});
tabla.agregar({
    fecha: "13/2/25",
    descripcion: "Taxi",
    categoria: "Movilidad",
    tipo: "Gasto",
    monto: 8
});


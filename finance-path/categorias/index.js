import { Header, SidebarItem } from "../componentes/index.js";
import { openDB, getCategorias, loadCategorias, addCategori, deleteCategoria} from "../componentes/index.js";

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
setCategorias.className = "categorias-grid"

dashboardScreen.appendChild(masCategoria);
dashboardScreen.appendChild(setCategorias)

// main view
//----------------------------
// specific components 
class categoriaComponent
{
    constructor(imagenSrc, nombre, id)
    {
        this.imagenSrc = imagenSrc;
        this.nombre = nombre;
        this.id = id;
    }

    render()
    {
        const categoriaContainer = document.createElement("div");
        categoriaContainer.className = "categoria-card";
        if (this.id !== undefined) categoriaContainer.dataset.id = this.id;

        const img = document.createElement("img");
        img.className = "categoria-img";
        img.src = this.imagenSrc || "";
        img.alt = this.nombre || "categoria";

        const label = document.createElement("div");
        label.className = "categoria-nombre";
        label.textContent = this.nombre || "";

        categoriaContainer.appendChild(img);
        categoriaContainer.appendChild(label);

        return categoriaContainer;
    }
}

class categoriaAdicionalComponent
{
    constructor(nombre, id)
    {
        this.nombre = nombre;
        this.id = id;
    }

    render()
    {
        const categoriaContainer = document.createElement("div");
        categoriaContainer.classList.add( "categoria-card", "categoria-adicional-card");
        if (this.id !== undefined) categoriaContainer.dataset.id = this.id;

        const img = document.createElement("img");
        img.classList.add( "categoria-img", "img-adicional");
        img.src = "../categorias-images/adicional.png" || "";
        img.alt = this.nombre || "categoria";

        const imgDelete = document.createElement("img");
        imgDelete.classList.add("corner-icon");
        imgDelete.src = "../categorias-images/delete.png" || "";

        const imgEdit = document.createElement("img");
        imgEdit.classList.add("corner-icon");
        imgEdit.src = "../categorias-images/edit.png" || "";

        const label = document.createElement("div");
        label.classList.add("categoria-nombre", "nombre-adicional");
        label.textContent = this.nombre || "";

        const cornerIconsContainer = document.createElement("div");
        cornerIconsContainer.className = "corner-icons-container";
        cornerIconsContainer.appendChild(imgDelete);
        cornerIconsContainer.appendChild(imgEdit);
        
        categoriaContainer.appendChild(cornerIconsContainer);
        categoriaContainer.appendChild(img);
        categoriaContainer.appendChild(label);

        return categoriaContainer;
    }
}

const CategoriaAlimentacion = new categoriaComponent("../categorias-images/alimentacion.png", "ALIMENTACIÓN", "alimentacion");
const CategoriaTransporte = new categoriaComponent("../categorias-images/transporte.png", "TRANSPORTE", "transporte");
const CategoriaOCIO = new categoriaComponent("../categorias-images/ocio.png", "OCIO", "ocio"); 
const categoriaSERVICIOS = new categoriaComponent("../categorias-images/servicios.png", "SERVICIOS", "servicios");
const categoriaSALUD = new categoriaComponent("../categorias-images/salud.png", "SALUD", "salud");
const categoriaEDUCACION = new categoriaComponent("../categorias-images/educacion.png", "EDUCACIÓN", "educacion");
const categoriaOTROS = new categoriaComponent("../categorias-images/otros.png", "OTROS", "otros");
const categoriaADICIONAL = new categoriaAdicionalComponent("NUEVO", "nueva");
const CategoriaAdicionalComponent = new categoriaAdicionalComponent("NUEVOAA", "nueva");

setCategorias.appendChild(CategoriaAlimentacion.render());
setCategorias.appendChild(CategoriaTransporte.render());
setCategorias.appendChild(CategoriaOCIO.render());
setCategorias.appendChild(categoriaSERVICIOS.render());
setCategorias.appendChild(categoriaSALUD.render());
setCategorias.appendChild(categoriaEDUCACION.render());
setCategorias.appendChild(categoriaOTROS.render());

setCategorias.appendChild(categoriaADICIONAL.render());
setCategorias.appendChild(CategoriaAdicionalComponent.render());

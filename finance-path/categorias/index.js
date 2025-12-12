import { Header, SidebarItem } from "../componentes/index.js";
import { openDB, getCategorias} from "../indexedDB/indexedDB.js";

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
        imgDelete.addEventListener('click', (e) => {
          
          if (!window.confirm(`¿Seguro que deseas eliminar "${this.nombre}"?`)) return;
          const idToDelete = this.id;
          deleteCategoria(idToDelete);
        });

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

async function addCategoria(nombre) { // adds a category; accepts optional `nombre`

    // Expect caller to provide the category name; default to empty string when omitted
    let categoriaTexto = String(nombre || '').trim().toUpperCase();
    if (!categoriaTexto) return alert("Por favor, ingresa una categoría.");
    try {
        let db = await openDB();
        let transaction = db.transaction(["categorias"], "readwrite");
        let store = transaction.objectStore("categorias");
        let request = store.add({ nombre: categoriaTexto });

        request.onsuccess = () => {
            loadCategorias();
        };
    } catch (error) {
        console.error(error);
    }
}
async function loadCategorias(){// loads categories added
    try{
        let allCategorias = await getCategorias();
        //let containerCategorias = document.getElementById("Categorias");

        if (allCategorias.length === 0) {
            setCategorias.innerHTML = "<p>No hay Categorias</p>";
            return;
        }

        setCategorias.innerHTML = "";
        allCategorias.forEach(categoria => {
            if(categoria.nombre==="ALIMENTACION")
            {
              const CategoriaAlimentacion = new categoriaComponent("../categorias-images/alimentacion.png", "ALIMENTACIÓN", categoria.id);
              setCategorias.appendChild(CategoriaAlimentacion.render());
              return;
            }
            if(categoria.nombre==="TRANSPORTE")
            {
              const CategoriaTransporte = new categoriaComponent("../categorias-images/transporte.png", "TRANSPORTE", categoria.id);
              setCategorias.appendChild(CategoriaTransporte.render());
              return;
            }

            if(categoria.nombre==="OCIO")
            {
              const CategoriaOCIO = new categoriaComponent("../categorias-images/ocio.png", "OCIO", categoria.id);
              setCategorias.appendChild(CategoriaOCIO.render());
              return;
            }

            if(categoria.nombre==="SERVICIOS")
            {
              const categoriaSERVICIOS = new categoriaComponent("../categorias-images/servicios.png", "SERVICIOS", categoria.id);
              setCategorias.appendChild(categoriaSERVICIOS.render());
              return;
            }

            if(categoria.nombre==="SALUD")
            {
              const categoriaSALUD = new categoriaComponent("../categorias-images/salud.png", "SALUD", categoria.id);
              setCategorias.appendChild(categoriaSALUD.render());
              return;
            }

            if(categoria.nombre==="EDUCACION")
            {
              const categoriaEDUCACION = new categoriaComponent("../categorias-images/educacion.png", "EDUCACIÓN", categoria.id);
              setCategorias.appendChild(categoriaEDUCACION.render());
              return;
            }

            if(categoria.nombre==="OTROS")
            {
              const categoriaOTROS = new categoriaComponent("../categorias-images/otros.png", "OTROS", categoria.id);
              setCategorias.appendChild(categoriaOTROS.render());
              return;
            }

            let nombreCategoria = categoria.nombre.toUpperCase();
            const nuevaCategoria = new categoriaAdicionalComponent(nombreCategoria, categoria.id);
            setCategorias.appendChild(nuevaCategoria.render());
        });
    }
    catch(error)
    {
        console.error(error);
    }
} 
async function deleteCategoria(id) {
    try {
        let db = await openDB();
        let transaction = db.transaction(["categorias"], "readwrite");
        let store = transaction.objectStore("categorias");
        let request = store.delete(id);
        request.onsuccess = () => loadCategorias();
    } catch (error) {
        console.error(error);
    }
}

// AddCategoriaModal component: a small window to add a category
export class AddCategoriaModal {
  constructor(onSave = null) {
    this.onSave = onSave; // callback that receives the new category name
    this.root = null;
  }

  render(parent, anchor = null) {
    // modal root
    const modal = document.createElement('div');
    modal.className = 'add-cat-modal';
    modal.style.position = anchor ? 'absolute' : modal.style.position;

    // header
    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('div');
    title.className = 'modal-title';
    title.innerHTML = `<span class="plus-icon">+</span> Añadir categoría`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => this.close());

    header.appendChild(title);
    header.appendChild(closeBtn);

    // body
    const body = document.createElement('div');
    body.className = 'modal-body';

    const field = document.createElement('label');
    field.className = 'modal-field';
    field.innerHTML = `Nombre`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'modal-input';
    input.placeholder = '';
    field.appendChild(input);

    body.appendChild(field);

    // actions
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-guardar';
    saveBtn.textContent = 'Guardar';
    saveBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (!val)
        {
          window.alert('Por favor, ingresa un nombre para la categoría.');
          return input.focus(); 
        } 
      if (typeof this.onSave === 'function') this.onSave(val);
      this.close();
    });

    actions.appendChild(saveBtn);

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(actions);

    // attach to parent and keep reference
    // If an anchor is provided we append to document.body and position beside the anchor.
    if (anchor && anchor.getBoundingClientRect) {
      document.body.appendChild(modal);
      const rect = anchor.getBoundingClientRect();
      // place to the right of the anchor with a small gap
      modal.style.top = (rect.top + window.scrollY) + 'px';
      modal.style.left = (rect.right + 8 + window.scrollX) + 'px';
      modal.style.zIndex = 9999;
    } else {
      parent.appendChild(modal);
    }
    this.root = modal;
    // focus input
    input.focus();
  }

  close() {
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
    this.root = null;
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
setCategorias.className= 'categorias-grid';

const modal = new AddCategoriaModal((newCatName) => {addCategoria(newCatName);});
const masCategoriaBtn = new ButtonWithImage('Añadir categoría','../imgs/plus.png', 
    () => { modal.render(document.body, masCategoriaBtn.root); 
  });
masCategoriaBtn.render(masCategoria);

dashboardScreen.appendChild(masCategoria);
dashboardScreen.appendChild(setCategorias);
// main view
//----------------------------
// specific components 
loadCategorias();

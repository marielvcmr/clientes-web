let db;

//open database
/*export function openDB() {

    return new Promise((resolve, reject) => {

        let request = indexedDB.open("FinanceDB", 1);
        request.onupgradeneeded = (event) => {

            let db = event.target.result;
            db.createObjectStore("categorias", { keyPath: "id", autoIncrement: true });
            db.createObjectStore("transacciones", { keyPath: "id", autoIncrement: true });
            db.createObjectStore("presupuestos", { keyPath: "id", autoIncrement: true });
        }        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al abrir IndexedDB");
    });
}*/

/*
get all categories from indexedDB
if ALIMENTACION no esta add
if TRANSPORTE no esta add
if OCIO no esta add
if SERVICIOS no esta add
if SALUD no esta add
if EDUCACION no esta add
if OTROS no esta add
*/

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("FinanceDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Crear stores solo si no existen
            if (!db.objectStoreNames.contains("categorias")) {
                db.createObjectStore("categorias", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("transacciones")) {
                db.createObjectStore("transacciones", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("presupuestos")) {
                db.createObjectStore("presupuestos", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => {
            const db = request.result;

            const tx = db.transaction("categorias", "readwrite");
            const store = tx.objectStore("categorias");

            const defaults = [
                "ALIMENTACION",
                "TRANSPORTE",
                "OCIO",
                "SERVICIOS",
                "SALUD",
                "EDUCACION",
                "OTROS"
            ];

            const req = store.getAll();

            req.onsuccess = () => {
                const existentes = req.result.map(c => c.nombre);

                defaults.forEach(nombre => {
                    if (!existentes.includes(nombre)) {
                        store.add({ nombre });
                    }
                });

                tx.oncomplete = () => resolve(db);
            };

            req.onerror = () => reject("Error leyendo categorías");
        };

        request.onerror = () => reject("Error al abrir la base de datos");
    });
}


export function getCategorias()
{
    return new Promise(async (resolve, reject) => {
        try {
            let db = await openDB();
            let transaction = db.transaction(["categorias"], "readonly");
            let store = transaction.objectStore("categorias");
            let request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Error al obtener las categorias");
        } catch (error) {
            reject(error);
        }
    });
}
export async function loadCategorias(){// loads categories added
    try{
        let allCategorias = await getCategorias();
        //let containerCategorias = document.getElementById("Categorias");

        if (allCategorias.length === 0) {
            containerCategorias.innerHTML = "<p>No hay Categorias</p>";
            return;
        }

        containerCategorias.innerHTML = "";
        allCategorias.forEach(categoria => {
            let categoriaElemento = document.createElement("div");
            categoriaElemento.textContent = categoria.nombre;

            //code to delete category on click
            categoriaElemento.style.cursor = "pointer";
            categoriaElemento.addEventListener("click", () => {
                if (window.confirm(`¿Seguro que deseas eliminar "${categoria.nombre}"?`)) {
                    deleteCategoria(categoria.id);
                }
            });
            // end of code to delete category on click

            containerCategorias.appendChild(categoriaElemento);
        });
    }
    catch(error)
    {
        console.error(error);
    }
} 
export async function addCategoria(nombre) { // adds a category; accepts optional `nombre`

    // Expect caller to provide the category name; default to empty string when omitted
    let categoriaTexto = String(nombre || '').trim();
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

export async function deleteCategoria(id) {
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

//--------------
/*const anadirCategoriaBtn = document.getElementById("anadir-categoria-btn");
const categoriaInput = document.getElementById("categoria-input");
const categoriaList = document.getElementById("Categorias");

//--------------Event Listeners
anadirCategoriaBtn.addEventListener("click", addCategoria);

// Load categories on page load
window.onload = loadCategorias;*/


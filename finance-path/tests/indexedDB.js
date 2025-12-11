let db;

//open database
function openDB() {

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
}

function getCategorias()
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
async function loadCategorias(){// loads categories added
    try{
        let allCategorias = await getCategorias();
        let containerCategorias = document.getElementById("Categorias");

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
async function addCategoria(){ // adds a category
    let categoriaTexto = document.getElementById("categoria-input").value.trim();
    if (!categoriaTexto) return alert("Por favor, ingresa una categoría.");
    try {
        let db = await openDB();
        let transaction = db.transaction(["categorias"], "readwrite");
        let store = transaction.objectStore("categorias");
        let request = store.add({ nombre: categoriaTexto });

        request.onsuccess = () => {
            document.getElementById("categoria-input").value = "";
            loadCategorias();
        };
    } catch (error) {
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









//--------------
const anadirCategoriaBtn = document.getElementById("anadir-categoria-btn");
const categoriaInput = document.getElementById("categoria-input");
const categoriaList = document.getElementById("Categorias");

//--------------Event Listeners
anadirCategoriaBtn.addEventListener("click", addCategoria);

// Load categories on page load
window.onload = loadCategorias;


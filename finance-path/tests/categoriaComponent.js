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



const CategoriaComponentOCIO = new categoriaComponent("../categorias-images/ocio.png", "OCIO", "ocio");
document.body.appendChild(CategoriaComponentOCIO.render());

const CategoriaAdicionalComponent = new categoriaAdicionalComponent("NUEVO", "nueva");
document.body.appendChild(CategoriaAdicionalComponent.render());

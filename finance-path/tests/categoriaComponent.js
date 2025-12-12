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



const CategoriaComponentOCIO = new categoriaComponent("../categorias-images/ocio.png", "OCIO", "ocio");
document.body.appendChild(CategoriaComponentOCIO.render());

const CategoriaComponentSALUD = new categoriaComponent("../categorias-images/salud.png", "SALUD", "salud");
document.body.appendChild(CategoriaComponentSALUD.render());

const CategoriaComponentTRANSPORTE = new categoriaComponent("../categorias-images/transporte.png", "TRANSPORTE", "transporte");
document.body.appendChild(CategoriaComponentTRANSPORTE.render());

const CategoriaComponentALIMENTACION = new categoriaComponent("../categorias-images/alimentacion.png", "ALIMENTACION", "alimentacion");
document.body.appendChild(CategoriaComponentALIMENTACION.render());

const CategoriaComponentSERVICIOS = new categoriaComponent("../categorias-images/servicios.png", "SERVICIOS", "servicios");
document.body.appendChild(CategoriaComponentSERVICIOS.render());


const CategoriaComponentOTROS = new categoriaComponent("../categorias-images/otros.png", "OTROS", "otros");
document.body.appendChild(CategoriaComponentOTROS.render());

const CategoriaComponentADICIONAL = new categoriaComponent("../categorias-images/adicional.png", "ADICIONAL", "adicional");
document.body.appendChild(CategoriaComponentADICIONAL.render());
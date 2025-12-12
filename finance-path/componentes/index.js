//SidebarComponent
export class Sidebar {
  constructor() {
    this.root = document.createElement("aside");
    this.root.className = "sidebar";
  }
  render(parent) {
    parent.appendChild(this.root);
  }
}

//HeaderComponent
export class Header {
  constructor() {
    this.root = document.createElement("header");
    this.root.className = "header";

    this.root.style.display= 'flex';
    this.root.style.flexDirection = 'row';


    this.root.innerHTML = `
      <div class="menu-icon"><img src="../imgs/menu-Icon.png" alt="Menú"></div> 
      <div class="logo"><img src="../imgs/FinancePath.png" alt="FinancePath"></div> 
    `;
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}

export class Dropdown {
    constructor(name, options = []) {
        this.name = name;
        this.options = options;

        // Crear el <select>
        this.root = document.createElement("select");
        this.root.name = this.name;
        this.root.id = this.name;
        this.root.className = "drop-down";

        // Crear las opciones
        this.options.forEach(optText => {
            const option = document.createElement("option");
            option.value = optText;
            option.textContent = optText;
            this.root.appendChild(option); // ← CORREGIDO
        });
    }

    render(parent) {
        parent.appendChild(this.root);
    }
}



//ChartCardComponent
export class ChartCard {
  constructor(title) {
    this.root = document.createElement("div");
    this.root.className = "chart-card";

    this.title = document.createElement("h3");
    this.title.textContent = title;

    this.content = document.createElement("div");
    this.content.className = "chart-placeholder";

    this.root.append(this.title, this.content);
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}

//Componente contenedor principal
export class Dashboard {
  constructor() {
    this.root = document.createElement("main");
    this.root.className = "dashboard";

    this.grid = document.createElement("div");
    this.grid.className = "dashboard-grid";

    this.root.appendChild(this.grid);
  }

  addCard(card) {
    card.render(this.grid);
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}

export class Button {
  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;

    this.root = document.createElement("button");
    this.root.className = "btn";
    this.root.textContent = this.label;

    // Asignar evento click
    if (typeof this.onClick === "function") {
      this.root.addEventListener("click", this.onClick);
    }
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}


export function primerosDiezDesde(n) {
    const lista = [];
    for (let i = 0; i < 10; i++) {
        lista.push(n + i);
    }
    return lista;
}

export class SidebarItem {
  constructor(title, link) {
    this.title = title;
    this.link = link;

    // Crear elemento
    this.root = document.createElement("a");
    this.root.className = "sidebar-item";
    this.root.href = this.link;        // <-- href correcto
    this.root.textContent = this.title;
    this.root.target = "_self";        // <-- target correcto
  }
  render(parent) {
    parent.appendChild(this.root);
  }
}

export class Title {
  constructor(name) {
    this.name = name;

    // Crear el elemento raíz del componente
    this.root = document.createElement('div');
    this.root.textContent = this.name;
    this.root.className = 'title';
  }

  render(parent) {
    parent.appendChild(this.root);
  }
}

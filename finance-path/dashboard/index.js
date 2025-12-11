//SidebarComponent
class Sidebar {
  constructor(items) {
    this.root = document.createElement("aside");
    this.root.className = "sidebar";

    items.forEach(item => {
      this.root.appendChild(this.createItem(item));
    });
  }

  createItem(text) {
    const el = document.createElement("div");
    el.className = "sidebar-item";
    el.textContent = text;
    return el;
  }
  render(parent) {
    parent.appendChild(this.root);
  }
}

//HeaderComponent
class Header {
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

class Dropdown {
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
class ChartCard {
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
class Dashboard {
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

class Button {
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


function primerosDiezDesde(n) {
    const lista = [];
    for (let i = 0; i < 10; i++) {
        lista.push(n + i);
    }
    return lista;
}


//Composición final

const app = document.getElementById("app");

new Header().render(app);

// ⬇️ NUEVO CONTENEDOR PARA ROW PRINCIPAL
const mainRow = document.createElement("div");
mainRow.className = "main-row";
app.appendChild(mainRow);

// Sidebar a la izquierda
const sidebar = new Sidebar([
  "MAIN",
  "CATEGORÍAS",
  "TRANSACCIONES",
  "PRESUPUESTOS"
]);
sidebar.render(mainRow);

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
Filters.style.className = "filtros";

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
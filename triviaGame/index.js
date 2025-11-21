const body = document.body;
const personalInfo = document.getElementById("personal-info")
const playBtn = document.getElementById("play")

const gameScreen = document.getElementById("game-screen");
const gameScreenBoard = document.getElementById("boards-grid");

function showScreen(id)
{
    document.querySelectorAll('.screen').forEach(div => div.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

class textBoard{
    constructor(labelColor, contentColor, headerText, id)
    {
        this.labelColor = labelColor;
        this.contentColor = contentColor;
        this.headerText = headerText;
        this.id = id;
    }

    render()
    {
        const textBoard = document.createElement("div");
        const headerBoard = document.createElement("div");

        headerBoard.innerHTML = this.headerText;

        textBoard.style.backgroundColor = this.contentColor;
        headerBoard.style.backgroundColor = this.labelColor;

        if (this.id) {
            textBoard.id = this.id;
        }

        textBoard.classList.add("board-text");
        headerBoard.classList.add("header-board");

        textBoard.appendChild(headerBoard);
        return textBoard;
    }
}

showScreen("game-screen");
const statsBoard  = new textBoard("blue", "white", "Estadisticas", "stats-board");
const secondsBoard = new textBoard("blue", "white", "Segundos restantes", "seconds-board");
const preguntaBoard = new textBoard("yellow", "white", "Pregunta", "pregunta-board");


gameScreenBoard.appendChild(statsBoard.render());
gameScreenBoard.appendChild(secondsBoard.render());
gameScreenBoard.appendChild(preguntaBoard.render());

/*showScreen("main-screen");*/
const dimInput = document.getElementById('matrix-dim');
const genBtn = document.getElementById('generar-matrix-btn');
const resetBtn = document.getElementById('reset-btn');

const sumBtn = document.getElementById('suma-btn');
const restaBtn = document.getElementById('resta-btn');
const multBtn = document.getElementById('mult-btn');
const multEscalarBtn = document.getElementById('mult-escalar-btn');
const trasBtn = document.getElementById('tras-btn');
const detBtn = document.getElementById('det-btn');
const invBtn = document.getElementById('inv-btn');
const idBtn = document.getElementById('id-btn');

const operandAGrid = document.getElementById('operand-A-grid');
const operandA = document.getElementById('operand-A');
const operandBGrid = document.getElementById('operand-B-grid');
const operandBlabel = document.getElementById('op-B-label');
const operandAlabel = document.getElementById('op-A-label');
const operandB = document.getElementById('operand-B');
const resultGrid = document.getElementById('result-grid');
const resultLabel = document.getElementById('result-label');
const operatorLabel = document.getElementById('operator');
const operationsContainer = document.getElementById('operations-tab');

let currentMode = 'default';
// current grid size (only changed by the dimension input). Default is 2.
let currentSize = 2;
let currentOperation = 'Suma';

//validateDimension: returns integer n if valid, otherwise null
function validateDimension(value) 
{
	const trimmedValue = value.trim();
    const num = Number(trimmedValue);

    if(Number.isInteger(num))
    {
        if(2<= num && num<=10)
        {
            return num;
        }
		else
		{
			window.alert('n debe estar entre 2 y 10');
		}
    }
	else
	{
		window.alert('n debe ser un número entero entre 2 y 10');
	}
    return null;
}


/*modes: 'default' (A, B and result are matrices ), 
'scalar' (A, result matrix and B is scalar), 
'single' (A and result matrix, B is not included), 
'det' (A matrix -> result 1x1)*/

//alterGrids: recreate the grids depending on current mode
function alterGrids(n = currentSize) {

	/*if n is not a valid integer in range, fall back 
    to currentSize (do not force 2)     CHANGEABLE*/
	if (!Number.isInteger(n) || n < 2 || n > 10) 
	{
		n = currentSize;
	}

	//operand containers visible by default
	operandA.style.display = '';
	operandAlabel.textContent = 'Matriz A';

	operandB.style.display = '';
	operandBlabel.textContent = 'Matriz B';

	const grids = [operandAGrid, operandBGrid, resultGrid];

	grids.forEach(grid => 
        {
		    if (!grid)
            {
             return;
            }

		    // default style for matrix grids
		    grid.style.display = 'grid';
		    grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
		    grid.style.gap = '5px';

		    // remove existing children
		    while (grid.firstChild) 
            {
                grid.removeChild(grid.firstChild);
            }

		    // Special-case operandB when currentMode === 'scalar'
		    if (grid === operandBGrid && currentMode === 'scalar') {

		    	// create a single scalar input centered
		    	const wrapper = document.createElement('div');
		    	wrapper.style.display = 'flex';
		    	wrapper.style.alignItems = 'center';
		    	wrapper.style.justifyContent = 'center';
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number matrix-entry';
		    	input.style.width = '50px';
                input.style.height = '50px'
		    	wrapper.appendChild(input);
		    	grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
                grid.style.gridTemplateRows = `repeat(1, 1fr)`;
		    	grid.appendChild(wrapper);
                operandBlabel.textContent = 'Escalar B';
		    	return;
		    }

			if (grid === operandBGrid && currentMode == 'single') {
				operandB.style.display = 'none';
				operandBlabel.textContent = '';
				return;
			}

		    // For result grid in determinant mode, make 1x1
		    if (grid === resultGrid && currentMode === 'det') {
		    	grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
                grid.style.gridTemplateRows = `repeat(1, 1fr)`;
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number';
				input.style.width = '50px';
		    	grid.appendChild(input);

				// hide operand B area (do not remove elements) so it can be restored later
				operandB.style.display = 'none';
				operandBlabel.textContent = '';

		    	return;
		    }

			if(grid === operandAGrid && currentMode === 'unity')
			{
				operandA.style.display = 'none';
				operandAlabel.textContent = '';
                return;
			}

			if(grid === operandBGrid && currentMode === 'unity')
			{
				operandB.style.display = 'none';
				operandBlabel.textContent = '';
                return;
			}


		    /* if  grid was not operand-B in scalar or result in  det
                the grid is filled with input cells as a matrix
            */
		   if(grid === resultGrid)
		   {
			for (let i = 0; i < n * n; i++) {
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number';
		    	grid.appendChild(input);
		    }
		   }
		   else 
		   {
			for (let i = 0; i < n * n; i++) {
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number matrix-entry';
		    	grid.appendChild(input);
		    }
		   }

	});
}

//apply the dimension value (validate then alter or reset)
function applyDimensionFromInput() {
	const val = dimInput ? dimInput.value : null;
	const n = validateDimension(val); // can be null or a valid integer number

	if (!n)  // n = null --> invalid input
    {
		currentSize = 2;
		if (dimInput) 
		{					// set back to current size 2
			dimInput.value = String(currentSize);
		}
		alterGrids();
	} 
	else 
	{
		// valid -> update currentSize and rebuild
		currentSize = n;
		if (dimInput) dimInput.value = String(n);
		alterGrids();
	}
}

dimInput.addEventListener('change', () => applyDimensionFromInput());
dimInput.addEventListener('keydown', (event)=>{

	if(event.key === 'Enter')
	{
		event.preventDefault();
		applyDimensionFromInput();
	}
});

resetBtn.addEventListener('click', () => {
	applyDimensionFromInput();
});

genBtn.addEventListener('click', () => {
	const matrixEntries = document.querySelectorAll('.matrix-entry');
	
	matrixEntries.forEach(entry => {
		entry.value = String(Math.floor(Math.random() * 21)-10);
	});
});

sumBtn.addEventListener('click', ()=>
{
	currentMode = 'default';
	currentOperation = 'Suma';
	alterGrids()
	operatorLabel.textContent = '+';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontWeight = 800;
	resultLabel.textContent = 'A + B ';
});

restaBtn.addEventListener('click', ()=>
{
	currentMode = 'default';
	currentOperation = 'Resta';
	alterGrids()
	operatorLabel.textContent = '-';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontWeight = 800;
	resultLabel.textContent = 'A - B ';
});

multBtn.addEventListener('click', ()=>
{
	currentMode = 'default';
	currentOperation = 'Multiplicacion';
	alterGrids();
	operatorLabel.textContent = 'x';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	operatorLabel.style.fontWeight = 200;
	resultLabel.textContent = 'A x B ';
});

multEscalarBtn.addEventListener('click', ()=>
{
	currentMode = 'scalar';
	currentOperation = 'Multiplicacion Escalar';
	alterGrids();
	operatorLabel.textContent = 'x';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	operatorLabel.style.fontWeight = 200;
	resultLabel.textContent = 'A x B ';
});

trasBtn.addEventListener('click', ()=>
{
	currentMode = 'single';
	currentOperation = 'Transpuesta';
	alterGrids();
	operatorLabel.textContent = '';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	resultLabel.textContent = 'Aᵀ';
});

detBtn.addEventListener('click', ()=>
{
	currentMode = 'det';
	currentOperation = 'Determinante';
	alterGrids();
	operatorLabel.textContent = '';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	resultLabel.textContent = 'Det (A)';
});

invBtn.addEventListener('click', ()=>
{
	currentMode = 'single';
	currentOperation = 'Inversa';
	alterGrids();
	operatorLabel.textContent = '';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	resultLabel.textContent = 'A⁻¹';
});

idBtn.addEventListener('click', ()=>
{
	currentMode = 'unity';
	currentOperation = 'Identidad';
	alterGrids();
	operatorLabel.textContent = '';	
	operatorLabel.style.fontSize = '25px';
	operatorLabel.style.fontFamily = 'Arial Black';
	resultLabel.textContent = 'I';
});

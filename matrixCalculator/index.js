const dimInput = document.getElementById('matrix-dim');
const genBtn = document.getElementById('generar-matrix-btn');
const resetBtn = document.getElementById('reset-btn');


const operandAGrid = document.getElementById('operand-A-grid');
const operandBGrid = document.getElementById('operand-B-grid');
const operandBlabel = document.getElementById('op-B-label');
const operandB = document.getElementById('operand-B');
const resultGrid = document.getElementById('result-grid');
const operatorLabel = document.getElementById('operator');
const operationsContainer = document.getElementById('operations-tab');


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
let currentMode = 'default';
// current grid size (only changed by the dimension input). Default is 2.
let currentSize = 2;

//alterGrids: recreate the grids depending on current mode
function alterGrids(n = currentSize) {

	/*if n is not a valid integer in range, fall back 
    to currentSize (do not force 2)     CHANGEABLE*/
	if (!Number.isInteger(n) || n < 2 || n > 10) 
	{
		n = currentSize;
	}

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
		    grid.style.gap = '6px';

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
		    	input.className = 'input-number';
		    	input.style.width = '50px';
                input.style.height = '50px'
		    	wrapper.appendChild(input);
		    	grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
                grid.style.gridTemplateRows = `repeat(1, 1fr)`;
		    	grid.appendChild(wrapper);
                operandBlabel.textContent = 'Escalar B';
		    	return;
		    }

            if(grid === operandBGrid && currentMode == 'single')
            {
                while (operandB.firstChild) 
                {
                    operandB.removeChild(operandB.firstChild);
                }
                return;
            }

		    // For result grid in determinant mode, make 1x1
		    if (grid === resultGrid && currentMode === 'det') {
		    	grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
                grid.style.gridTemplateRows = `repeat(1, 1fr)`;
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number';
		    	grid.appendChild(input);

                //remove operands from B
                while (operandB.firstChild) 
                {
                    operandB.removeChild(operandB.firstChild);
                }

		    	return;
		    }

		    /* if  grid was not operand-B in scalar or result in  det
                the grid is filled with input cells as a matrix
            */
		    for (let i = 0; i < n * n; i++) {
		    	const input = document.createElement('input');
		    	input.type = 'text';
		    	input.className = 'input-number';
		    	grid.appendChild(input);
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
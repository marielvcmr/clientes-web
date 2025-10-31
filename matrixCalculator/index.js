const dimInput = document.getElementById('matrix-dim');
const genBtn = document.getElementById('generar-matrix-btn');
const resetBtn = document.getElementById('reset-btn');
const calResult = document.getElementById('result-btn');

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
	currentOperation = 'Traspuesta';
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

function createZeroMatrix(n)  /*returns square array matrix with zero's*/
{
	const m = new Array(n);
	for (let i = 0; i < n; i++) // adds rows
	{
		m[i] = new Array(n).fill(0);
	}
	return m;
}

/*returns null if input is invalid, and the number 
if input is valid*/ 
function isNumber(input)
{
	returnValue = null;
	let trimmed = input.value.trim();
	if(trimmed === '')
	{
		return returnValue;
	}
	let num = Number(trimmed);
	if (!Number.isNaN(num))
	{
		returnValue = num;
	}
	return returnValue;
}

/* returns the array with matrix elements
	numbers if they are valid, and undefined if there is 
	at least an invalid input
*/
function readMatrixFromGrid(grid, n) 
{
	const gridMatrix = createZeroMatrix(n);
	const inputs = grid.querySelectorAll('input');
	const inputCount = inputs.length;

	for (let k = 0; k < inputCount; k++) {

		const inValue = isNumber(inputs[k]);
		if (inValue === null)
		{
			return;
		}
		const row = Math.floor(k / n);
		const col = k % n;
		gridMatrix[row][col] = inValue;
	}
	return gridMatrix;
}

/* types a matrix array in a matrix grid*/
function writeMatrixToGrid(grid, matrix) 
{
	const n = matrix.length;
	const inputs = grid.querySelectorAll('input');
	/*for a read grid, it's sure that its length 
	is the result matrix length*/
	for (let k = 0; k < n*n; k++) {
		const row = Math.floor(k /n);
		const col = k % n;
		inputs[k].value = String(matrix[row][col]);
	}
}

function determinanteGaussJordan(matrix) {
  const n = matrix.length;
  //copy
  const A = matrix.map(row => row.slice());
  let det = 1;

  for (let i = 0; i < n; i++) {
    // Find pivot
    let pivotRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[j][i]) > Math.abs(A[pivotRow][i])) {
        pivotRow = j;
      }
    }

    // Zero pivot, determinant is zero
    if (A[pivotRow][i] === 0) return 0;

    // Swap rows if needed
    if (pivotRow !== i) {
      [A[i], A[pivotRow]] = [A[pivotRow], A[i]];
      det *= -1; // Row swap changes sign
    }

    // Multiply det by pivot
    det *= A[i][i];

    // Normalize pivot row
    const pivotVal = A[i][i];
    for (let k = i; k < n; k++) {
      A[i][k] /= pivotVal;
    }

    // Eliminate other rows
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        const factor = A[j][i];
        for (let k = i; k < n; k++) {
          A[j][k] -= factor * A[i][k];
        }
      }
    }
  }

  // Round to 4 decimal digits if not integer
  const rounded = Math.round(det * 10000) / 10000;
  return Number.isInteger(rounded) ? rounded : parseFloat(rounded.toFixed(4));
}

calResult.addEventListener('click', ()=>
{
	switch(currentOperation)
	{
		case 'Suma':
			const arrayAs = readMatrixFromGrid(operandAGrid, currentSize);
			const arrayBs = readMatrixFromGrid(operandBGrid, currentSize);
			if(arrayAs === undefined || arrayBs === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				let arrayResult = createZeroMatrix(currentSize);
				for (let i = 0; i<currentSize; i++)
				{
					for(let j = 0; j<currentSize; j++)
					{
						arrayResult[i][j] = arrayAs[i][j] + arrayBs[i][j];
					}
				}  // generates the arrayResult 

				writeMatrixToGrid(resultGrid, arrayResult);
			}
			break;

		case 'Resta':
			const arrayAr = readMatrixFromGrid(operandAGrid, currentSize);
			const arrayBr = readMatrixFromGrid(operandBGrid, currentSize);
			if(arrayAr === undefined || arrayBr === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				let arrayResult = createZeroMatrix(currentSize);
				for (let i = 0; i<currentSize; i++)
				{
					for(let j = 0; j<currentSize; j++)
					{
						arrayResult[i][j] = arrayAr[i][j] - arrayBr[i][j];
					}
				}  // generates the arrayResult 

				writeMatrixToGrid(resultGrid, arrayResult);
			}
			break;

		case 'Multiplicacion':
			const arrayAm = readMatrixFromGrid(operandAGrid, currentSize);
			const arrayBm = readMatrixFromGrid(operandBGrid, currentSize);
			if(arrayAm === undefined || arrayBm === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				let arrayResult = createZeroMatrix(currentSize);
				const n = currentSize;
				for (let i = 0; i < n; i++)
				{
	        		for (let j = 0; j < n; j++) 
					{
        			    let sum = 0;
        			    for (let k = 0; k < n; k++)
						{
        			        sum += arrayAm[i][k] * arrayBm[k][j];
        			    }
        			    arrayResult[i][j] = sum;
        			}
				}
				writeMatrixToGrid(resultGrid, arrayResult);
			}
			break;

		case 'Multiplicacion Escalar':
			const arrayAme = readMatrixFromGrid(operandAGrid, currentSize);
			const arrayBme = readMatrixFromGrid(operandBGrid, 1);
			if(arrayAme === undefined || arrayBme === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				let arrayResult = createZeroMatrix(currentSize);
				for (let i = 0; i<currentSize; i++)
				{
					for(let j = 0; j<currentSize; j++)
					{
						arrayResult[i][j] = arrayAme[i][j]* arrayBme[0][0];
					}
				}  // generates the arrayResult 

				writeMatrixToGrid(resultGrid, arrayResult);
			}
			break;

		case 'Traspuesta':
			const arrayAt = readMatrixFromGrid(operandAGrid, currentSize);
			if(arrayAt === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				let arrayResult = createZeroMatrix(currentSize);
				for (let i = 0; i<currentSize; i++)
				{
					for(let j = 0; j<currentSize; j++)
					{
						arrayResult[j][i] = arrayAt[i][j];
					}
				}  // generates the arrayResult 

				writeMatrixToGrid(resultGrid, arrayResult);
			}
			break;

		case 'Determinante':

			const arrayAd = readMatrixFromGrid(operandAGrid, currentSize);
			if(arrayAd === undefined)
			{
				window.alert('Entrada invalida. Las matrices deben contener numeros');
			}
			else
			{
				const det = determinanteGaussJordan(arrayAd);
				const resultInput = resultGrid.querySelector('input');
				resultInput.value = String(det);
			}
			break;

		case 'Inversa':
			break;

		case 'Identidad':
			let arrayResult = createZeroMatrix(currentSize);
			for (let i = 0; i<currentSize; i++)
				{
					for(let j = 0; j<currentSize; j++)
					{
						if(i === j)
						{
							arrayResult[i][j] = 1;
						}
						else
						{
							arrayResult[i][j] = 0;
						}
					}
				} 
				writeMatrixToGrid(resultGrid, arrayResult);
			break;
			
		default:
			break;
	}

});
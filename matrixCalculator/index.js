const dimInput = document.getElementById('matrix-dim');
const genBtn = document.getElementById('generar-matrix-btn');
const resetBtn = document.getElementById('reset-btn');


const operandAGrid = document.getElementById('operand-A-grid');
const operandBGrid = document.getElementById('operand-B-grid');
const resultGrid = document.getElementById('result-grid');
const operatorLabel = document.getElementById('operator');
const operationsContainer = document.getElementById('operations-tab');


// 1) validateDimension: returns integer n if valid, otherwise null
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
    }
    return null;
}

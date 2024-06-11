createMatrix('A', 3, 3);
createMatrix('B', 3, 3);

function createMatrix(matrixId, rows, cols) {
    const matrixContainer = document.getElementById(`matrix${matrixId}`);
    const table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.value = 0;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    matrixContainer.innerHTML = '';
    matrixContainer.appendChild(table);
    resizeCells(matrixId, rows, cols);
}

function getMatrixValues(matrixId) {
    const rows = [];
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    for (let row of table.rows) {
        const rowData = [];
        for (let cell of row.cells) {
            rowData.push(parseFloat(cell.querySelector('input').value));
        }
        rows.push(rowData);
    }
    return rows;
}

function setMatrixValues(matrixId, values) {
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    while (table.rows.length > values.length) {
        table.deleteRow(-1);
    }
    while (table.rows.length < values.length) {
        const row = table.insertRow();
        for (let i = 0; i < values[0].length; i++) {
            const cell = row.insertCell();
            const input = document.createElement('input');
            cell.appendChild(input);
        }
    }
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[0].length; j++) {
            table.rows[i].cells[j].querySelector('input').value = values[i][j];
        }
    }
    resizeCells(matrixId, values.length, values[0].length);
}

function addRow(matrixId) {
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    const row = table.insertRow();
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const cell = row.insertCell();
        const input = document.createElement('input');
        input.value = 0;
        cell.appendChild(input);
    }
    resizeCells(matrixId, table.rows.length, table.rows[0].cells.length);
}

function removeRow(matrixId) {
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    resizeCells(matrixId, table.rows.length, table.rows[0].cells.length);
}

function addColumn(matrixId) {
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    for (let row of table.rows) {
        const cell = row.insertCell();
        const input = document.createElement('input');
        input.value = 0;
        cell.appendChild(input);
    }
    resizeCells(matrixId, table.rows.length, table.rows[0].cells.length);
}

function removeColumn(matrixId) {
    const table = document.getElementById(`matrix${matrixId}`).querySelector('table');
    if (table.rows[0].cells.length > 1) {
        for (let row of table.rows) {
            row.deleteCell(-1);
        }
    }
    resizeCells(matrixId, table.rows.length, table.rows[0].cells.length);
}

function resizeCells(matrixId, rows, cols) {
    const maxSize = 24;
    const minSize = 8;
    const size = Math.max(minSize, maxSize - Math.max(rows, cols));
    const inputs = document.querySelectorAll(`#matrix${matrixId} input`);
    inputs.forEach(input => {
        input.style.fontSize = `${size}px`;
        input.style.width = `${size * 2}px`;  
        input.style.height = `${size * 2}px`; 
    });
}

function transposeMatrix(matrixId) {
    const values = getMatrixValues(matrixId);
    const transposed = math.transpose(values);
    setMatrixValues(matrixId, transposed);
    renderMathExpression(`\\text{Транспонування } \\mathbf{${matrixId}}`, `\\text{transpose}(\\mathbf{${matrixId}}) = ${formatMatrix(transposed)}`);
}

function calculateDeterminant(matrixId) {
    const values = getMatrixValues(matrixId);
    try {
        const determinant = math.det(values);
        renderMathExpression(`\\text{Детермінант } \\mathbf{${matrixId}}`, `\\text{det}(\\mathbf{${matrixId}}) = ${determinant}`);
    } catch (error) {
        renderMathExpression(`\\text{Детермінант } \\mathbf{${matrixId}}`, "\\text{Помилка введення.}")
    }
}

function addMatrices() {
    const matrixA = getMatrixValues('A');
    const matrixB = getMatrixValues('B');
    try {
        const result = math.add(matrixA, matrixB);
        renderMathExpression(`\\mathbf{A} + \\mathbf{B}`, `${formatMatrix(matrixA)} + ${formatMatrix(matrixB)} = ${formatMatrix(result)}`);
    } catch (error) {
        renderMathExpression(`\\mathbf{A} + \\mathbf{B}`, "\\text{Матриці не підходять по розміру для виконання операції.}")
    }
}

function subtractMatrices() {
    const matrixA = getMatrixValues('A');
    const matrixB = getMatrixValues('B');
    try {
        const result = math.subtract(matrixA, matrixB);
        renderMathExpression(`\\mathbf{A} - \\mathbf{B}`, `${formatMatrix(matrixA)} - ${formatMatrix(matrixB)} = ${formatMatrix(result)}`);
    } catch (error) {
        renderMathExpression(`\\mathbf{A} - \\mathbf{B}`, "\\text{Матриці не підходять по розміру для виконання операції.}")
    }
}

function multiplyMatrices() {
    const matrixA = getMatrixValues('A');
    const matrixB = getMatrixValues('B');
    try {
        const result = math.multiply(matrixA, matrixB);
        renderMathExpression(`\\mathbf{A} \\times \\mathbf{B}`, `${formatMatrix(matrixA)} \\times ${formatMatrix(matrixB)} = ${formatMatrix(result)}`);
    } catch (error) {
        renderMathExpression(`\\mathbf{A} \\times \\mathbf{B}`, "\\text{Матриці не підходять по розміру для виконання операції.}")
    }
}

function formatMatrix(matrix) {
    let formatted = '\\begin{pmatrix}';
    for (let row of matrix) {
        formatted += row.join(' & ') + '\\\\';
    }
    formatted += '\\end{pmatrix}';
    return formatted;
}

function renderMathExpression(operation, result) {
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <p>Операція: $$${operation}$$</p>
            <p>Результат: $$${result}$$</p>
        `;
        renderMathInElement(resultContainer);
    }
}



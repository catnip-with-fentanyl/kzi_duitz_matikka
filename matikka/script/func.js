function generateData(func) {
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        try {
            if (isFinite(func.evaluate({ x }))) {
                xValues.push(x);
                yValues.push(func.evaluate({ x }));
            }
        } catch (e) {
            break;
        }
    }
    return { x: xValues, y: yValues };
}

function findZeros(func) {
    const zeros = [];
    for (let x = -10; x <= 10; x += 0.1) {
        try {
            if (Math.abs(func.evaluate({ x })) < 1e-5) {
                zeros.push(x.toFixed(3));
            }
        } catch (e) {
            return false;
        }
    }
    return zeros;
}

function isPeriodic(func, period) {
    for (let x = -10; x <= 10; x += 0.1) {
        try {
            if (Math.abs(func.evaluate({ x }) - func.evaluate({ x: x + period })) > 1e-5) {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    return true;
}

function findDiscontinuities(func) {
    const discontinuities = [];
    for (let x = -10; x <= 10; x += 0.01) {
        try {
            if (isFinite(func.evaluate({ x }))) {
                xValues.push(x);
                yValues.push(func.evaluate({ x }));
            }
        } catch (e) {
            return false;
        }
    }
    return discontinuities;
}

function checkSymmetry(func) {
    let isEven = true;
    let isOdd = true;

    for (let x = -10; x <= 10; x += 0.1) {
        if (Math.abs(func.evaluate({ x }) - func.evaluate({ x: -x }) > 1e-5)) {
            isEven = false;
        }
        if (Math.abs(func.evaluate({ x }) + func.evaluate({ x: -x })) > 1e-5) {
            isOdd = false;
        }
    }

    if (isEven) return "Парна";
    if (isOdd) return "Непарна";
    return "Ані парна, ані непарна";
}

function analyzeFunction() {
    const funcInput = document.getElementById("functionInput").value;
    const analysisResults = document.getElementById("analysisResults");
    analysisResults.innerHTML = '';

    try {
        const func = math.compile(funcInput);
        const data = generateData(func);

        Plotly.newPlot("analysisResults", [{
            x: data.x,
            y: data.y,
            mode: "lines",
            type: "scatter",
            line: { color: "blue" }
        }], {
            title: `${funcInput}`,
            xaxis: { title: "x" },
            yaxis: { title: "y" }
        });

        const periods = ["2π", "π", "1", "0.5", "0.25"]; 
        let period = "Немає";
        for (const p of periods) {
            const numericPeriod = p === "2π" ? 2 * Math.PI : (p === "π" ? Math.PI : parseFloat(p));
            if (isPeriodic(func, numericPeriod)) {
                period = p;
                break;
            }
        }
        const discontinuities = findDiscontinuities(func);
        const zeros = findZeros(func);
        const derivative = math.derivative(funcInput, "x");
        const symmetry = checkSymmetry(func);

        analysisResults.innerHTML += `
            <h3>Аналіз функції</h3>
            <p><strong>Функція:</strong>$$f(x) = ${funcInput}$$</p>
            <p><strong>Похідна:</strong> $$f'(x) = ${derivative}$$</p>
            <p><strong>Періодичність:</strong> ${period}</p>
            <p><strong>Точки розриву:</strong> ${discontinuities.length > 0 ? discontinuities.join(", ") : "Немає"}</p>
            <p><strong>Нулі функції:</strong> ${zeros.length > 0 ? zeros.join(", ") : "Немає"}</p>
            <p><strong>Парність/непарність:</strong> ${symmetry}</p>
        `;
        renderMathInElement(analysisResults);
    } catch (e) {
        analysisResults.innerHTML = "Помилка введення.";
    }
}




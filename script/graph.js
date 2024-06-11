function generateData(func) {
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.01) {
        if (isFinite(func.evaluate({x})) && !isNaN(func.evaluate({x}))) {
            xValues.push(x);
            yValues.push(func.evaluate({ x }));
        } 
    }
    return { x: xValues, y: yValues };
}

function updateGraph() {
    const funcInput = document.getElementById("functionInput").value;
    try {
        const func = math.compile(funcInput);
        const data = generateData(func);

        Plotly.newPlot("graph", [{
            x: data.x,
            y: data.y,
            mode: "lines",
            type: "scatter",
            name: funcInput,
            line: { color: "blue" }
        }], {
            title: `${funcInput}`,
            xaxis: { title: "x" },
            yaxis: { title: "y" }
        });
    } 
    catch (e) {
        alert("Помилка введення.");
    }
}

updateGraph();

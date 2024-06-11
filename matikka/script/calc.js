function insert(value) {
    const input = document.getElementById("expression-input");
    input.value += value;
}

function calculate() {
    const input = document.getElementById("expression-input").value;
    const resultElement = document.getElementById("result");
    
    try {
        const result = math.evaluate(input);
        resultElement.innerHTML = `$$${input} = ${result.toFixed(4)}$$`;
        renderMathInElement(resultElement);
    } catch (error) {
        resultElement.innerHTML = "Помилка введення.";
    }
}

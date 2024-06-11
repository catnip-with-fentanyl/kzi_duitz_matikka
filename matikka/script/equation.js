function solveProblem() {
    
    const input = document.getElementById("equationInput").value;
    const results = document.getElementById("results");
    results.innerHTML = "";
    try {
        const steps = MS.mathsteps.solveEquation(input, false);
        steps.forEach(step => {
            results.innerHTML += `$$${step.newEquation.print()}$$`;
        }); 
        renderMathInElement(results);
    } catch (error) {
        results.innerHTML = "Помилка введення.";
    }
}

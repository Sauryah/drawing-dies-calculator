function calculateDies() {
    const finalDieDiameter = parseFloat(document.getElementById('finalDieDiameter').value);
    const elongationPercentage = parseFloat(document.getElementById('elongationPercentage').value);

    const dieListElement = document.getElementById('dieList');
    const numDiesElement = document.getElementById('numDies');

    // Clear previous results
    dieListElement.innerHTML = '';
    numDiesElement.textContent = '0';

    if (isNaN(finalDieDiameter) || isNaN(elongationPercentage) || finalDieDiameter <= 0 || elongationPercentage <= 0) {
        dieListElement.innerHTML = '<li>Invalid input. Please enter positive numbers.</li>';
        return;
    }

    const factor = Math.sqrt(1 + elongationPercentage / 100);
    const dies = [];
    let currentDiameter = finalDieDiameter;

    // Start from the final die and work backwards
    // We'll stop when the next die is significantly larger (e.g., > 1000mm)
    let maxDiameter = 1000;
    let dieCount = 0;

    // We'll store the diameters in an array and then display them
    while (currentDiameter < maxDiameter) {
        dies.unshift(currentDiameter); // Add to the beginning of the array
        currentDiameter *= factor;
        dieCount++;
        if (dieCount > 50) { // Safety break to prevent infinite loops
            break;
        }
    }

    numDiesElement.textContent = dieCount - 1; // Subtract 1 because we want the number of dies before the final one

    // Populate the list with the calculated die sizes
    dies.forEach((diameter, index) => {
        if (index > 0) { // Skip the very last die in the list
            const listItem = document.createElement('li');
            listItem.textContent = `Die ${index}: ${diameter.toFixed(3)} mm`;
            dieListElement.appendChild(listItem);
        }
    });

    // Add the final die separately for clarity
    const finalDieItem = document.createElement('li');
    finalDieItem.textContent = `Final Die (d): ${finalDieDiameter.toFixed(3)} mm`;
    finalDieItem.style.fontWeight = 'bold';
    dieListElement.appendChild(finalDieItem);
}
function calculateDies() {
    // Get values from the input fields
    const finalDie = parseFloat(document.getElementById('finalDie').value);
    const elongationPercentage = parseFloat(document.getElementById('elongationPercentage').value);
    const numberOfDies = parseInt(document.getElementById('numberOfDies').value);

    // Get HTML elements for results
    const preFinalDieResultElement = document.getElementById('preFinalDieResult');
    const dieListElement = document.getElementById('dieList');

    // Clear previous results
    preFinalDieResultElement.textContent = '0';
    dieListElement.innerHTML = '';

    // Validate inputs
    if (isNaN(finalDie) || isNaN(elongationPercentage) || isNaN(numberOfDies) || finalDie <= 0 || elongationPercentage <= 0 || numberOfDies <= 0) {
        preFinalDieResultElement.textContent = 'Invalid Input';
        dieListElement.innerHTML = '<li>Please enter valid positive numbers.</li>';
        return;
    }

    // Calculation for a single step (pre-final die D)
    const factor = Math.sqrt(1 + elongationPercentage / 100);
    const preFinalDie = finalDie * factor;
    preFinalDieResultElement.textContent = preFinalDie.toFixed(3);

    // Calculation for the series of dies
    let currentDie = finalDie;
    const dies = [finalDie];

    for (let i = 0; i < numberOfDies; i++) {
        currentDie = currentDie * factor;
        dies.push(currentDie);
    }
    
    // Display the die schedule in reverse order (from largest to smallest)
    for (let i = dies.length - 1; i >= 0; i--) {
        const dieSize = dies[i];
        const listItem = document.createElement('li');
        
        if (i === 0) {
            listItem.textContent = `Final Die (d): ${dieSize.toFixed(3)}`;
            listItem.style.fontWeight = 'bold';
        } else {
            listItem.textContent = `Die ${i}: ${dieSize.toFixed(3)}`;
        }
        dieListElement.appendChild(listItem);
    }
}
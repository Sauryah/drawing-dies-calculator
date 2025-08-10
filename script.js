function updateLabel() {
    const direction = document.querySelector('input[name="direction"]:checked').value;
    const startingDieLabel = document.getElementById('startingDieLabel');
    if (direction === 'previous') {
        startingDieLabel.textContent = 'Final Die (d):';
        document.getElementById('startingDie').placeholder = 'e.g., 0.649';
    } else { // 'next'
        startingDieLabel.textContent = 'Starting Die (D):';
        document.getElementById('startingDie').placeholder = 'e.g., 0.729';
    }
}

function calculateDies() {
    const startingDie = parseFloat(document.getElementById('startingDie').value);
    const elongationPercentage = parseFloat(document.getElementById('elongationPercentage').value);
    const numberOfDies = parseInt(document.getElementById('numberOfDies').value);
    const direction = document.querySelector('input[name="direction"]:checked').value;

    const dieListElement = document.getElementById('dieList');
    const summaryMessageElement = document.getElementById('summaryMessage');
    
    dieListElement.innerHTML = '';
    summaryMessageElement.textContent = '';

    if (isNaN(startingDie) || isNaN(elongationPercentage) || isNaN(numberOfDies) || startingDie <= 0 || elongationPercentage <= 0 || numberOfDies <= 0) {
        summaryMessageElement.textContent = 'Please enter valid positive numbers.';
        return;
    }

    const factor = Math.sqrt(1 + elongationPercentage / 100);
    const dies = [startingDie];
    let currentDie = startingDie;

    for (let i = 0; i < numberOfDies; i++) {
        if (direction === 'previous') {
            currentDie *= factor;
        } else { // 'next'
            currentDie /= factor;
        }
        dies.push(currentDie);
    }
    
    // Display the list of dies
    if (direction === 'previous') {
        summaryMessageElement.textContent = `Calculating ${numberOfDies} previous dies starting from a final die of ${startingDie.toFixed(3)}.`;
        // Display in reverse order for "previous"
        for (let i = dies.length - 1; i >= 0; i--) {
            const dieSize = dies[i];
            const listItem = document.createElement('li');
            if (i === 0) {
                listItem.textContent = `Final Die (d): ${dieSize.toFixed(3)}`;
            } else {
                listItem.textContent = `Previous Die ${i}: ${dieSize.toFixed(3)}`;
            }
            dieListElement.appendChild(listItem);
        }
    } else { // 'next'
        summaryMessageElement.textContent = `Calculating ${numberOfDies} next dies starting from a die of ${startingDie.toFixed(3)}.`;
        // Display in forward order for "next"
        dies.forEach((dieSize, index) => {
            const listItem = document.createElement('li');
            if (index === 0) {
                listItem.textContent = `Starting Die (D): ${dieSize.toFixed(3)}`;
            } else {
                listItem.textContent = `Next Die ${index}: ${dieSize.toFixed(3)}`;
            }
            dieListElement.appendChild(listItem);
        });
    }
}

// Initial call to set the correct label on page load
updateLabel();
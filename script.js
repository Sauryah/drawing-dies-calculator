function updateLabel() {
    const direction = document.querySelector('input[name="direction"]:checked').value;
    const startingDieLabel = document.getElementById('startingDieLabel');
    if (direction === 'previous') {
        startingDieLabel.textContent = 'Final Die (d):';
        document.getElementById('startingDie').placeholder = 'e.g., 0.123';
    } else {
        startingDieLabel.textContent = 'Starting Die (D):';
        document.getElementById('startingDie').placeholder = 'e.g., 0.123';
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
        } else {
            currentDie /= factor;
        }
        dies.push(currentDie);
    }
    
    if (direction === 'previous') {
        summaryMessageElement.textContent = `Calculating ${numberOfDies} previous dies starting from a final die of ${startingDie.toFixed(3)}.`;
        for (let i = dies.length - 1; i >= 0; i--) {
            const listItem = document.createElement('li');
            listItem.textContent = (i === 0) 
                ? `Final Die (d): ${dies[i].toFixed(3)}`
                : `Previous Die ${i}: ${dies[i].toFixed(3)}`;
            dieListElement.appendChild(listItem);
        }
    } else {
        summaryMessageElement.textContent = `Calculating ${numberOfDies} next dies starting from a die of ${startingDie.toFixed(3)}.`;
        dies.forEach((dieSize, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = (index === 0) 
                ? `Starting Die (D): ${dieSize.toFixed(3)}`
                : `Next Die ${index}: ${dieSize.toFixed(3)}`;
            dieListElement.appendChild(listItem);
        });
    }
}

updateLabel();

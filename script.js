function calculateDies() {
    const finalDie = parseFloat(document.getElementById('finalDie').value);
    const elongationPercentage = parseFloat(document.getElementById('elongationPercentage').value);
    const numberOfDies = parseInt(document.getElementById('numberOfDies').value);
    const direction = document.querySelector('input[name="direction"]:checked').value;

    const dieListElement = document.getElementById('dieList');
    dieListElement.innerHTML = '';

    if (isNaN(finalDie) || isNaN(elongationPercentage) || isNaN(numberOfDies) || finalDie <= 0 || elongationPercentage <= 0 || numberOfDies <= 0) {
        dieListElement.innerHTML = '<li>Please enter valid positive numbers.</li>';
        return;
    }

    const factor = Math.sqrt(1 + elongationPercentage / 100);
    const dies = [finalDie];
    let currentDie = finalDie;

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
        // Display in reverse order for "previous"
        for (let i = dies.length - 1; i >= 0; i--) {
            const dieSize = dies[i];
            const listItem = document.createElement('li');
            if (i === 0) {
                listItem.textContent = `Starting Die: ${dieSize.toFixed(3)}`;
                listItem.style.fontWeight = 'bold';
            } else {
                listItem.textContent = `Die ${i}: ${dieSize.toFixed(3)}`;
            }
            dieListElement.appendChild(listItem);
        }
    } else { // 'next'
        // Display in forward order for "next"
        dies.forEach((dieSize, index) => {
            const listItem = document.createElement('li');
            if (index === 0) {
                listItem.textContent = `Starting Die: ${dieSize.toFixed(3)}`;
                listItem.style.fontWeight = 'bold';
            } else {
                listItem.textContent = `Die ${index}: ${dieSize.toFixed(3)}`;
            }
            dieListElement.appendChild(listItem);
        });
    }
}
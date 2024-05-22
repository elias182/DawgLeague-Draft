document.addEventListener('DOMContentLoaded', () => {
    const teams = [
        { name: 'Strada BoyZ', image: 'teamElias.png' },
        { name: 'Equipo 2', image: 'team2.jpg' },
        { name: 'Equipo 3', image: 'team3.jpg' },
        { name: 'Equipo 4', image: 'team4.jpg' },
        { name: 'Equipo 5', image: 'team5.jpg' },
        { name: 'Equipo 6', image: 'team6.jpg' }
    ];

    const picks = shuffleArray([...teams]);
    const serpentineOrder = getSerpentineOrder(picks);

    displayResults(picks, serpentineOrder);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getSerpentineOrder(picks) {
    const serpentineOrder = [];
    const numRounds = 7;  // Número de rondas de picks que se quieren mostrar
    for (let round = 0; round < numRounds; round++) {
        if (round % 2 === 0) {
            // Ronda en orden normal
            for (let i = 0; i < picks.length; i++) {
                serpentineOrder.push(picks[i]);
            }
        } else {
            // Ronda en orden inverso
            for (let i = picks.length - 1; i >= 0; i--) {
                serpentineOrder.push(picks[i]);
            }
        }
    }
    return serpentineOrder;
}

function displayResults(picks, serpentineOrder) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let pickIndex = 0;
    function showNextPick() {
        if (pickIndex < picks.length) {
            const team = picks[pickIndex];
            const pickDiv = document.createElement('div');
            pickDiv.classList.add('pick');
            pickDiv.innerHTML = `
                <h2>Pick #${picks.length - pickIndex}</h2>
                <img src="./${team.image}" alt="${team.name}">
                <p>${team.name}</p>
            `;
            resultDiv.appendChild(pickDiv);
            pickIndex++;
            setTimeout(() => {
                pickDiv.classList.add('show'); // Mostrar el pick con transición de opacidad
                setTimeout(() => {
                    pickDiv.classList.add('hide'); // Ocultar el pick con transición de derecha a izquierda
                    setTimeout(() => {
                        resultDiv.removeChild(pickDiv); // Eliminar el pick después de la transición
                        showNextPick(); // Mostrar el siguiente pick
                    }, 500);
                }, 3000);
            }, 100);
        } else {
            // Después de mostrar todos los picks, mostrar el orden serpentin
            displaySerpentineOrder(serpentineOrder);
        }
    }

    showNextPick();
}

function displaySerpentineOrder(serpentineOrder) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const serpentineDiv = document.createElement('div');
    serpentineDiv.classList.add('serpetineOrder');
    serpentineOrder.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `
            <p class="pickenter"><span class="numpic">Pick #${index + 1}:</span> ${team.name}</p>
        `;
        serpentineDiv.appendChild(teamDiv);
    });
    resultDiv.appendChild(serpentineDiv);
}
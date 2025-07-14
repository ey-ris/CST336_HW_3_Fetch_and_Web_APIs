const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    resultsDiv.innerHTML = '';

    const name = document.getElementById('nameInput').value.trim();
    const species = document.getElementById('speciesInput').value.trim();

    let url = `https://rickandmortyapi.com/api/character/?`;
    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (species) url += `species=${encodeURIComponent(species)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No characters found.");
        }

        const data = await response.json();
        data.results.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <p>Gender: ${character.gender}</p>
          `;
            resultsDiv.appendChild(card);
        });
    } catch (error) {
        resultsDiv.innerHTML = `<p style="text-align:center; color: red;">${error.message}</p>`;
    }
});
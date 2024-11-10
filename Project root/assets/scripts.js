document.addEventListener('DOMContentLoaded', () => {
    const addTournamentButton = document.getElementById('addTournamentButton');
    const formContainer = document.getElementById('formContainer');
    const tournamentForm = document.getElementById('tournamentForm');
    const tournamentTable = document.querySelector('#tournamentTable tbody');
    const cancelButton = document.getElementById('cancelButton');

    let tournaments = [];
    let editingIndex = null;

    // Show the form to create a new tournament
    addTournamentButton.addEventListener('click', () => {
        formContainer.style.display = 'block';
        tournamentForm.reset();
        editingIndex = null;
        document.getElementById('formTitle').textContent = 'Create Tournament';
    });

    // Hide the form
    cancelButton.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    // Add or update tournament
    tournamentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('tournamentName').value;
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;

        if (editingIndex === null) {
            tournaments.push({ name, location, date });
        } else {
            tournaments[editingIndex] = { name, location, date };
            editingIndex = null;
        }

        formContainer.style.display = 'none';
        renderTable();
    });

    // Render tournaments in the table
    function renderTable() {
        tournamentTable.innerHTML = '';
        tournaments.forEach((tournament, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${tournament.name}</td>
                <td>${tournament.location}</td>
                <td>${tournament.date}</td>
                <td>
                    <button onclick="editTournament(${index})">Edit</button>
                    <button onclick="deleteTournament(${index})">Delete</button>
                </td>
            `;

            tournamentTable.appendChild(row);
        });
    }

    // Edit tournament
    window.editTournament = function(index) {
        const tournament = tournaments[index];
        document.getElementById('tournamentName').value = tournament.name;
        document.getElementById('location').value = tournament.location;
        document.getElementById('date').value = tournament.date;
        formContainer.style.display = 'block';
        document.getElementById('formTitle').textContent = 'Edit Tournament';
        editingIndex = index;
    };

    // Delete tournament
    window.deleteTournament = function(index) {
        tournaments.splice(index, 1);
        renderTable();
    };
});

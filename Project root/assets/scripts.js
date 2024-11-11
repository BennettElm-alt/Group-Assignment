document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const addTournamentButton = document.getElementById("addTournamentButton");
    const formContainer = document.getElementById("formContainer");
    const tournamentForm = document.getElementById("tournamentForm");
    const tournamentTableBody = document.querySelector("#tournamentTable tbody");
    const cancelButton = document.getElementById("cancelButton");
    const formTitle = document.getElementById("formTitle");

    let editingRow = null;

    // Show the form to create a new tournament
    addTournamentButton.addEventListener("click", () => {
        formContainer.style.display = "block";
        formTitle.textContent = "Create Tournament";
        tournamentForm.reset();
        editingRow = null; // Reset editing state
    });

    // Hide the form and reset it
    cancelButton.addEventListener("click", () => {
        formContainer.style.display = "none";
        tournamentForm.reset();
    });

    // Handle form submission
    tournamentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("tournamentName").value;
        const location = document.getElementById("location").value;
        const date = document.getElementById("date").value;

        if (editingRow) {
            // Update the existing row
            editingRow.cells[0].textContent = name;
            editingRow.cells[1].textContent = location;
            editingRow.cells[2].textContent = date;
        } else {
            // Add a new row
            const row = tournamentTableBody.insertRow();
            row.innerHTML = `
                <td>${name}</td>
                <td>${location}</td>
                <td>${date}</td>
                <td>
                    <button class="btn btn-edit">Edit</button>
                    <button class="btn btn-delete">Delete</button>
                </td>
            `;

            // Add event listeners for new buttons
            row.querySelector(".btn-edit").addEventListener("click", () => editTournament(row));
            row.querySelector(".btn-delete").addEventListener("click", () => deleteTournament(row));
        }

        // Hide the form
        formContainer.style.display = "none";
        tournamentForm.reset();
    });

    // Edit a tournament
    function editTournament(row) {
        editingRow = row;
        formTitle.textContent = "Edit Tournament";
        formContainer.style.display = "block";

        document.getElementById("tournamentName").value = row.cells[0].textContent;
        document.getElementById("location").value = row.cells[1].textContent;
        document.getElementById("date").value = row.cells[2].textContent;
    }

    // Delete a tournament
    function deleteTournament(row) {
        if (confirm("Are you sure you want to delete this tournament?")) {
            row.remove();
        }
    }
});
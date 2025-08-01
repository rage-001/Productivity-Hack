document.getElementById('add-exam-btn').addEventListener('click', function() {
    const subject = prompt('Enter the subject:');
    const date = prompt('Enter the date (YYYY-MM-DD):');
    const time = prompt('Enter the time (HH:MM):');
    const location = prompt('Enter the location:');

    if (subject && date && time && location) {
        const tableBody = document.getElementById('exam-details-body');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${subject}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>${location}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);

        // Add event listeners for new Edit and Delete buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editExam(row));
        row.querySelector('.delete-btn').addEventListener('click', () => row.remove());
    }
});

function editExam(row) {
    const subject = prompt('Edit the subject:', row.children[0].textContent);
    const date = prompt('Edit the date (YYYY-MM-DD):', row.children[1].textContent);
    const time = prompt('Edit the time (HH:MM):', row.children[2].textContent);
    const location = prompt('Edit the location:', row.children[3].textContent);

    if (subject && date && time && location) {
        row.children[0].textContent = subject;
        row.children[1].textContent = date;
        row.children[2].textContent = time;
        row.children[3].textContent = location;
    }
}

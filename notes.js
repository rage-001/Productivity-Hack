document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    const noteFileInput = document.getElementById('noteFile');
    const noteTitleInput = document.getElementById('noteTitle');
    const notesList = document.getElementById('notesList');

    // Function to handle file uploads
    uploadButton.addEventListener('click', () => {
        const file = noteFileInput.files[0];
        const title = noteTitleInput.value;
        if (file && title) {
            const listItem = document.createElement('li');
            const fileUrl = URL.createObjectURL(file); // Create a URL for the file
            listItem.innerHTML = `
                <span>${title}</span>
                <div>
                    <button class="view-btn" onclick="viewNote('${fileUrl}')">View</button>
                    <button class="download-btn" onclick="downloadNote('${fileUrl}', '${file.name}')">Download</button>
                    <button class="edit-btn" onclick="editNote('${fileUrl}')">Edit</button>
                    <button class="delete-btn" onclick="deleteNote(this, '${fileUrl}')">Delete</button>
                </div>
            `;
            notesList.appendChild(listItem);
        }
    });

    // Function to view a note
    window.viewNote = (fileUrl) => {
        const viewer = window.open(fileUrl, '_blank');
        if (!viewer) {
            alert('Please allow pop-ups for this site to view the file.');
        }
    };

    // Function to download a note
    window.downloadNote = (fileUrl, fileName) => {
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Function to edit a note (not fully functional without backend)
    window.editNote = (fileUrl) => {
        // Example placeholder for editing
        alert('Editing functionality is not implemented in this demo.');
    };

    // Function to delete a note
    window.deleteNote = (button, fileUrl) => {
        if (confirm('Are you sure you want to delete this note?')) {
            const listItem = button.closest('li');
            listItem.remove();
            URL.revokeObjectURL(fileUrl); // Clean up the object URL
        }
    };
});

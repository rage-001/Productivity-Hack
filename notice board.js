// JavaScript for Notice Board functionality
const createBtn = document.querySelector('.create-btn');
const modal = document.getElementById('notice-modal');
const saveBtn = document.getElementById('save-btn');
const closeBtn = document.getElementById('close-btn');
const noticeTitleInput = document.getElementById('notice-title');
const noticeDescInput = document.getElementById('notice-desc');
const noticesContainer = document.getElementById('notices');

let editIndex = null;

// Display Modal for creating notice
createBtn.addEventListener('click', () => {
    document.getElementById('modal-title').textContent = "Create Notice";
    noticeTitleInput.value = '';
    noticeDescInput.value = '';
    modal.style.display = 'flex';
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Save Notice (Create or Edit)
saveBtn.addEventListener('click', () => {
    const title = noticeTitleInput.value;
    const desc = noticeDescInput.value;

    if (title === '' || desc === '') {
        alert('Please fill in both fields.');
        return;
    }

    if (editIndex === null) {
        // Create New Notice
        addNotice(title, desc);
    } else {
        // Edit Existing Notice
        updateNotice(title, desc, editIndex);
    }

    modal.style.display = 'none';
});

// Add Notice
function addNotice(title, desc) {
    const truncatedDesc = truncateText(desc, 10); // Get the first 10 words of the description
    const noticeDiv = document.createElement('div');
    noticeDiv.classList.add('notice');
    noticeDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${truncatedDesc}</p>
        <div class="notice-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Append the notice to the container
    noticesContainer.appendChild(noticeDiv);

    // Attach event listeners to Edit and Delete buttons
    noticeDiv.querySelector('.edit-btn').addEventListener('click', () => editNotice(noticeDiv));
    noticeDiv.querySelector('.delete-btn').addEventListener('click', () => deleteNotice(noticeDiv));
    noticeDiv.addEventListener('click', () => displayFullNotice(title, desc)); // Event listener to show full notice
}

// Truncate text to specified word limit
function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
}

// Edit Notice
function editNotice(noticeDiv) {
    const title = noticeDiv.querySelector('h3').textContent;
    const desc = noticeDiv.querySelector('p').textContent;

    noticeTitleInput.value = title;
    noticeDescInput.value = desc;

    editIndex = Array.from(noticesContainer.children).indexOf(noticeDiv);

    document.getElementById('modal-title').textContent = "Edit Notice";
    modal.style.display = 'flex';
}

// Update Notice
function updateNotice(title, desc, index) {
    const noticeDiv = noticesContainer.children[index];
    noticeDiv.querySelector('h3').textContent = title;
    noticeDiv.querySelector('p').textContent = truncateText(desc, 10); // Update with truncated description
    editIndex = null;
}

// Delete Notice
function deleteNotice(noticeDiv) {
    noticeDiv.remove();
}

// Display Full Notice
function displayFullNotice(title, desc) {
    const fullNoticeModal = document.getElementById('full-notice-modal');
    document.getElementById('full-notice-title').textContent = title;
    document.getElementById('full-notice-desc').textContent = desc;
    fullNoticeModal.style.display = 'flex';
}

// Close Full Notice
document.getElementById('close-full-notice-btn').addEventListener('click', () => {
    document.getElementById('full-notice-modal').style.display = 'none';
});

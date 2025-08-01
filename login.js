// JavaScript Function to Toggle Login Forms
function toggleLogin() {
    const teacherForm = document.querySelector('.login-teacher');
    const studentForm = document.querySelector('.login-student');
    const toggleBtn = document.querySelector('.toggle-btn');

    // Check which form is currently active and toggle
    if (teacherForm.classList.contains('active') || teacherForm.style.display === 'block') {
        teacherForm.classList.remove('active');
        teacherForm.style.display = 'none';
        studentForm.classList.add('active');
        studentForm.style.display = 'block';
        toggleBtn.textContent = 'Login as Teacher'; // Update button text
    } else {
        studentForm.classList.remove('active');
        studentForm.style.display = 'none';
        teacherForm.classList.add('active');
        teacherForm.style.display = 'block';
        toggleBtn.textContent = 'Login as Student'; // Update button text
    }
}

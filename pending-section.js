// Task management array stored in localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM elements
const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskFileInput = document.getElementById("taskFile");
const addTaskButton = document.getElementById("addTaskButton");
const pendingTaskList = document.getElementById("pendingTaskList");

// Function to render pending tasks
function renderTasks() {
    pendingTaskList.innerHTML = ''; // Clear the list

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.classList.add("task-item");

        // Create task title and description elements
        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");
        taskInfo.innerHTML = `<strong>${task.title}</strong><p>${task.description}</p>`;

        // Create action buttons: View, Edit, Complete
        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.addEventListener("click", () => viewTask(index));

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(index));

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => completeTask(index));

        // Append buttons to task element
        taskElement.appendChild(taskInfo);
        taskElement.appendChild(viewButton);
        taskElement.appendChild(editButton);
        taskElement.appendChild(completeButton);

        pendingTaskList.appendChild(taskElement);
    });
}

// Add new task
addTaskButton.addEventListener("click", () => {
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const file = taskFileInput.files[0];

    if (title === "" || description === "") {
        alert("Please fill out both fields.");
        return;
    }

    const newTask = {
        title: title,
        description: description,
        createdAt: new Date().getTime(), // For reminders
        file: file ? URL.createObjectURL(file) : null // Store the file URL
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskFileInput.value = "";
});

// View task
function viewTask(index) {
    const task = tasks[index];
    if (task.file) {
        window.open(task.file);
    } else {
        alert(`Title: ${task.title}\nDescription: ${task.description}`);
    }
}

// Edit task
function editTask(index) {
    const task = tasks[index];
    const newTitle = prompt("Edit Title:", task.title);
    const newDescription = prompt("Edit Description:", task.description);

    if (newTitle && newDescription) {
        tasks[index].title = newTitle;
        tasks[index].description = newDescription;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

// Complete task
function completeTask(index) {
    if (confirm("Mark this task as complete?")) {
        tasks.splice(index, 1); // Remove task from pending
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

// Reminder system: Flag tasks older than 7 days
function checkReminders() {
    const now = new Date().getTime();
    tasks.forEach((task, index) => {
        const taskAge = now - task.createdAt;
        const days = Math.floor(taskAge / (1000 * 60 * 60 * 24));
        if (days > 7) {
            alert(`Reminder: Task "${task.title}" has been pending for more than 7 days.`);
        }
    });
}

// Render tasks on page load
renderTasks();

// Check reminders every time page loads
checkReminders();

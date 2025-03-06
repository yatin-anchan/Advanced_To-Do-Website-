document.addEventListener("DOMContentLoaded", () => {
    // Load Dark Mode State
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("themeIcon").textContent = "light_mode";
    }

    // Load tasks from localStorage
    loadTasks();
});

// Toggle Dark Mode
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode.toString());

    themeIcon.textContent = isDarkMode ? "light_mode" : "dark_mode";
}

// Toggle Sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

// Toggle Popup Menu
function togglePopup() {
    const popup = document.getElementById("popupMenu");
    popup.classList.toggle("active");
}

// Close popup if clicked outside
window.addEventListener("click", function (event) {
    const popup = document.getElementById("popupMenu");
    const plusButton = document.getElementById("plusButton");

    if (!popup.contains(event.target) && !plusButton.contains(event.target)) {
        popup.classList.remove("active");
    }
});

// Handle Form Submit (Task Creation)
document.getElementById("createTaskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById("taskTitle").value.trim();
    const dueDate = document.getElementById("dueDate").value.trim();

    if (!taskTitle || !dueDate) {
        alert("Please enter both Task Title and Due Date.");
        return;
    }

    const task = {
        title: taskTitle,
        dueDate: dueDate
    };

    // Save task in localStorage
    saveTask(task);

    // Reset form and close popup
    document.getElementById("createTaskForm").reset();
    togglePopup();
});

// Save task to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update UI
    displayTask(task);
}

// Load and display tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(displayTask);
}

// Display a single task in the UI
function displayTask(task) {
    const taskContainer = document.getElementById("taskContainer");

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.innerHTML = `
        <div>
            <strong>${task.title}</strong><br>
            <small>Due: ${task.dueDate}</small>
        </div>
        <button onclick="deleteTask('${task.title}')">Delete</button>
    `;

    taskContainer.appendChild(taskCard);
}

// Delete task from localStorage & UI
function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Remove from UI
    document.getElementById("taskContainer").innerHTML = "";
    loadTasks();
}
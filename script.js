const form = document.getElementById("formContent");
const tablebody = document.querySelector("tbody");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
fillTable()

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    // get elements in the form
    const task = document.getElementById("task").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value.trim();
    const status = document.getElementById("status").value.trim();
    const time = document.getElementById("time").value;

    const taskManager = {
        task, description, priority, status,time
    }
    tasks.push(taskManager);
    fillTable()
    // set items
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

// Function to fill data in the table
function fillTable(){
    tablebody.innerHTML = ''
    
    // iterating through objects
    tasks.forEach((task, index) =>{
        const newTask = document.createElement('tr');
        newTask.innerHTML = `
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>${task.time}</td>
            <td>
            <button class="remove-btn">Remove</button>
            </td>
        `;
        tablebody.appendChild(newTask);
        // Function to remove an item from the scheduler
        const removeBtn = newTask.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
        newTask.remove(); // remove the row
        tasks.splice(index, 1); // remove the task from the array
        localStorage.setItem("tasks", JSON.stringify(tasks));
});
    });
    form.reset()

}

const removeBtn = newTask.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
        newTask.remove(); // remove the row
        tasks.splice(index, 1); // remove the task from the array
        localStorage.setItem("tasks", JSON.stringify(tasks));
});
const form = document.getElementById("formContent");
const tablebody = document.querySelector("tbody");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
fillTable()

// Add Enter key support for all input fields
const inputs = form.querySelectorAll("input");
inputs.forEach(input => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            form.dispatchEvent(new Event("submit"));
        }
    });
});

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
            <button class = "edit-btn">Edit</button>
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
    const editBtn = newTask.querySelector(".edit-btn");
    editBtn.addEventListener("click", ()=>{
        // Create an in[put field] ide
        const inputField = document.createElement("input")
        // Identify which task is to be edited, replace the display text with an input containing the existing data, listen for a save of blur event, update the data on your local storage
        inputField.type = "text";
        newTask.append(inputField);
        // tasks.trim(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    });
    form.reset()

}
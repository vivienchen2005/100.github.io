//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", onehundredtodos);
document.removeEventListener("DOMContentLoaded", onehundredtodos);
//document.addEventListener("DOMContentLoaded", resetProgressBarLoad);
document.addEventListener("DOMContentLoaded", updateProgressBarLoad);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions
function onehundredtodos (){
    var onehundredtodos = new Array ("Shop at thrift stores/buy second hand", "Carpool whenever you can.", "Walk your kids to school", "Plant trees", "Bike to your destination", "Use public transportation", "Buy an electric vehicle", "Put solar panels up on your roof", "Pick up 10 pieces of trash on the ground", "Organize a community project for solar panels", "Ask your town/city council to have a Climate Action Plan", "Campaign and vote for green candidates", "Compost food scraps", "Start a vegetable garden", "Bring reusable bags to the grocery and other stores", "Use a ceramic coffee mug instead of a disposable cup", "Buy products that you can reuse", "Recycle your cell phone", "Create a green club at school", "Organize a community garden project", "Organize a community project to plant trees", "Bring your own reusable bag when you go shopping", "Publish an article to inform others on how to help the environment", "Start a blog to spread awareness", "Donate to a charity", "Create a recycling program at school or work", "Support green-friendly brands", "Sign a petition to advocate for environmentally friendly policies", "Create a video on YouTube to spread awareness", "Code an app to help the environment", "Volunteer with an organization", "Create an informational Instagram page", "Sign 5 petitions advocate for environmentally friendly policies", "Apply to a greenpeace.org internship", "Share this list with others!");
    for (i = 0; i < onehundredtodos.length; i++) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = onehundredtodos[i];
        //ADD TODO TO LOCAL STORAGE
        saveLocalTodos(onehundredtodos[i]);
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    }
}

function addTodo(event) {
     //Prevent form from submitting
     event.preventDefault();
    if (!(todoInput.value === "")) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        //ADD TODO TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //CLEAR TEXT
        todoInput.value = "";
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    }
}

function deleteTodo(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //e.target.parentElement.remove();
        todo.addEventListener("transitionend", e =>{
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        if (todo.classList.contains ("completed")) {
            todo.classList.add("uncompleted");
            todo.classList.remove("completed");
            updateProgressBarDecrease();
        }
        else {
            todo.classList.add("completed");
            todo.classList.remove("uncompleted");
            updateProgressBarIncrease();
        }
        
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(e);
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = todo.children[0].innerText;
    //Remove from array
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);

        // if (todo.classList.contains ("completed")) {
        //     todo.style.display = "flex";
        // }
        // else {
        //     todo.style.display = "none";
        // }
    });
}

function updateProgressBarIncrease () {
    if (sessionStorage.getItem("value") === null) {
        var value = 0;
    }
    else {
        var value = parseInt(sessionStorage.getItem("value"));
    }
    value++;
    sessionStorage.setItem("value", value);
    document.querySelector(".progress").querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress").querySelector(".progress-text").textContent = `${value}%`;
}

function updateProgressBarDecrease () {
    if (sessionStorage.getItem("value") === null) {
        var value = 0;
    }
    else {
        var value = parseInt(sessionStorage.getItem("value"));
    }
    value--;
    sessionStorage.setItem("value", value);
    document.querySelector(".progress").querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress").querySelector(".progress-text").textContent = `${value}%`;
}

function resetProgressBarLoad () {
    var value = 0;
    sessionStorage.setItem("value", value);
    document.querySelector(".progress").querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress").querySelector(".progress-text").textContent = `${value}%`;
}

function updateProgressBarLoad () {
    if (sessionStorage.getItem("value") === null) {
        var value = 0;
    }
    else {
        var value = parseInt(sessionStorage.getItem("value"));
    }
    document.querySelector(".progress").querySelector(".progress-fill").style.width = `${value}%`;
    document.querySelector(".progress").querySelector(".progress-text").textContent = `${value}%`;
}




import capitalizeFirstLetter from "./utils/capitalizeFirstLetter.mjs";

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    const newTodo = {
      id: Date.now(),
      task: capitalizeFirstLetter(task),
      isCompleted: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
});

function renderTodos() {
  todoListUl.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");

    const todoContent = document.createElement("div");
    todoContent.className = "todo-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const textNode = document.createTextNode(" " + todo.task + " ");

    todoContent.appendChild(checkbox);
    todoContent.appendChild(textNode);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "material-icons delete-icon";
    deleteIcon.innerText = "delete";
    deleteIcon.setAttribute("data-id", todo.id);
    deleteIcon.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(todoContent);
    li.appendChild(deleteIcon);

    todoListUl.appendChild(li);
  });
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index > -1) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

renderTodos();
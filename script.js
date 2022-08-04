const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  //your code here
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
    return;
  }

  addTodo(inputAdd.value, false);
  inputAdd.value = "";
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";
  doneBtn.style.display = "none";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.style.display = "none";

  //your code here
  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through")
      span.style.textDecoration = "";
    else span.style.textDecoration = "line-through";
    saveTodo();
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  div.append(span);
  div.append(doneBtn);
  div.append(deleteBtn);

  todoCtn.prepend(div);

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  saveTodo();
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};

    const span = todoDiv.children[0];
    todoObj.title = span.innerText;
    todoObj.completed = span.style.textDecoration === "line-through";
    data.push(todoObj);
  }
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoData", dataStr);
}

function loadTodo() {
  //your code here
  const dataStr = localStorage.getItem("todoData");
  const data = JSON.parse(dataStr);

  for (const todoObj of data.reverse()) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();

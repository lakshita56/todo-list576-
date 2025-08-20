// grab elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// helper: build one <li> with text + Delete button
function createTaskItem(text) {
  const li = document.createElement("li");

  const span = document.createElement("span"); // task text
  span.textContent = text;

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    if (span.classList.contains("completed")) {
      span.textContent = "✅ " + span.textContent.replace(/^✅\s*/, "");
    } else {
      span.textContent = span.textContent.replace(/^✅\s*/, "");
    }
  });
  
  // Enable editing on double-click
  span.addEventListener("dblclick", () => {
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = span.textContent;

    // Replace span with input temporarily
    li.replaceChild(inputEdit, span);
    inputEdit.focus();
    

    // Save on Enter or when leaving input
    inputEdit.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishEdit();
    });
    inputEdit.addEventListener("blur", finishEdit);

    function finishEdit() {
      span.textContent = inputEdit.value.trim() || text;
      li.replaceChild(span, inputEdit);
    }

  });

  const delBtn = document.createElement("button"); // delete button
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

// add new task
function addTask() {
  const task = input.value.trim();
  if (!task) {
    alert("Please enter a task!");
    return;
  }
  const li = createTaskItem(task);
  taskList.appendChild(li);
  input.value = "";
  input.focus();
}

addBtn.addEventListener("click", addTask);

// Add with Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

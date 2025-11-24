const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskTable = document.getElementById("taskTable");

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const row = document.createElement("tr");

  // Task
  const taskCell = document.createElement("td");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskCell.appendChild(taskSpan);

  //  checkbox
  const doneCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    // taskSpan.classList.toggle("done-text", checkbox.checked);

    if (checkbox.checked) {
    taskSpan.classList.add("done-text")
  }else {
    taskSpan.classList.remove("done-text")
  }
  });
  
  doneCell.appendChild(checkbox);

  // Delete
  const deleteCell = document.createElement("td");
  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';

  deleteIcon.addEventListener("click", () => {
    if (confirm("R U Sure to delete this task")) {
      row.remove();
    }
  });
  deleteCell.appendChild(deleteIcon);

  row.appendChild(doneCell);
  row.appendChild(taskCell);
  row.appendChild(deleteCell);

  taskTable.appendChild(row);

  taskInput.value = "";
});

//

function openPage() {
  window.open("page.html", "_blank", " width=500 ,height=300");
}

let draggedElement = "";

const div1 = document.querySelector("#div1");
const div2 = document.querySelector("#div2");

div1.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "LABEL") {
    draggedElement = e.target;
  }
});

div2.addEventListener("dragover", (e) => e.preventDefault());

div2.addEventListener("drop", (e) => {
  e.preventDefault();

  
  if (e.target.tagName === "LABEL") {
    return;
  }

  if (draggedElement) {
   
    const alreadyExists = Array.from(div2.children).some(
      (child) => child.textContent === draggedElement.textContent
    );

    if (!alreadyExists) {
      div2.insertBefore(draggedElement, div2.firstChild); 
    }
  }
});

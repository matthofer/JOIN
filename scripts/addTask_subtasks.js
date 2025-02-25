/**
 * This function the icons at the inputfield
 * 
 */
function changeSubtasksIcons() {
  let input = document.getElementById("subtasks");
  let subtasksMenu = document.getElementById("subtasksMenu");
  if (input.value.length > 0) {
    input.style.backgroundImage = "none";
    subtasksMenu.classList.remove("d-none");
  } else {
    input.style.backgroundImage = "url(../assets/icons/subtasks.svg)";
    subtasksMenu.classList.add("d-none");
  }
}

/**
 * This function clear the inputfield 
 * 
 */
function clearSubtasksInput() {
  let input = document.getElementById("subtasks");
  input.value = "";
  changeSubtasksIcons();
}

/**
 * This function save the Subtask -- Value from the Inputfield
 * 
 */
function saveSubtasks() {
  let input = document.getElementById("subtasks");
  let maessage = document.getElementById("subtaskValidation");
  if (input.value.length > 0) {
    maessage.classList.add("d-none");
    subtasks.push(input.value);
    input.value = "";
    renderSubtasks();
    changeSubtasksIcons();
  } else {
    maessage.classList.remove("d-none");
  }
}

/**
 * This function render the SubtaskArray in a DIV
 * 
 */
function renderSubtasks() {
  let html = document.getElementById("renderedSubtasks");
  html.innerHTML = "";
  for (
    let subtasksIndex = 0;
    subtasksIndex < subtasks.length;
    subtasksIndex++
  ) {
    const subtask = subtasks[subtasksIndex];
    html.innerHTML += subtasksTemplate(subtask, subtasksIndex);
  }
}

/**
 * This function shows the Subtaskmenu 
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function showSubtaskMenu(subtasksIndex) {
  let menu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
  menu.classList.remove("d-none");
}

/**
 * This function close the Subtaskmenu 
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function closeSubtaskMenu(subtasksIndex) {
  let menu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
  menu.classList.add("d-none");
}

/**
 * This function delete a single Subtask
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function deleteSubtask(subtasksIndex) {
  subtasks.splice(subtasksIndex, 1);
  renderSubtasks();
}

/**
 * This function allows a doubleclick to edit a single Subtask
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function editSubtaskDBLClick(subtasksIndex) {
  let subTask = document.getElementById(`editSpan${subtasksIndex}`);
  subTask.setAttribute("contenteditable", "true");
  subTask.classList.toggle("cursor-text");
  editSubtaskWithEnter(subtasksIndex);
}

/**
 * This function is for to edit a existing Subtask
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function editSubtask(subtasksIndex) {
  let subTask = document.getElementById(`singleSubtask${subtasksIndex}`);
  let span = document.getElementById(`editSpan${subtasksIndex}`);
  let editMenu = document.getElementById(`editMenu${subtasksIndex}`);
  let hoverMenu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
  subTask.classList.toggle("border");
  subTask.classList.toggle("cursor-text");
  span.classList.toggle("white");
  editMenu.classList.toggle("d-none");
  hoverMenu.classList.add("visibilty");
  editSubtaskDBLClick(subtasksIndex);
  editSubtaskWithEnter(subtasksIndex);
}

/**
 * This function saves the edited Subtask and render the Subtask Div
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function saveEditedSubtask(subtasksIndex) {
  let hoverMenu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
  let spanInput = document.getElementById(`editSpan${subtasksIndex}`).innerHTML;
  hoverMenu.classList.remove("visibilty");
  subtasks[subtasksIndex] = spanInput;
  renderSubtasks();
}

/**
 * This function allows to save the Subtask with the Enter Keypress
 * 
 */
function submitSubtaskWithEnter() {
  let input = document.getElementById("subtasks");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        saveSubtasks();
      }
    });
  }
}

/**
 * This function allows to save the edited Subtask with the Enter Keypress
 * 
 * @param {*} subtasksIndex = Index from the single Subtask from the Array
 */
function editSubtaskWithEnter(subtasksIndex) {
  let input = document.getElementById(`editSpan${subtasksIndex}`);
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        saveEditedSubtask(subtasksIndex);
      }
    });
  }
}

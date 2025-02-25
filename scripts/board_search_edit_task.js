/**
 * This function search a specific task corrosponding to the user input
 *
 * @param {string} id - id of the search input html tag
 *
 */
function searchTask(id) {
  clearColumnContent();
  let searchInputRef = document.getElementById(id);
  let searchInput = searchInputRef.value;
  let searchResultArr = getSearchedTasks(searchInput);
  if (searchResultArr.length != tasks.length) {
    renderTasks(searchResultArr);
  }

  if (searchResultArr.length === tasks.length) {
    renderTasks(tasks);
    return;
  }
}

/**
 * This function returns the search result.
 * It searches for description and title. The two arrays with the search results are then concatenated and returned as one array
 *
 * @param {string} searchInput - value of the search input field
 *
 */
function getSearchedTasks(searchInput) {
  let filteredTitleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  let filteredDscrTasks = tasks.filter((task) =>
    task.dscr.toLowerCase().includes(searchInput.toLowerCase())
  );
  let filteredTasks = filteredTitleTasks.concat(filteredDscrTasks);
  filteredTasks = filteredTasks.filter(
    (item, index, array) =>
      index === array.findIndex((task) => task.firebaseid === item.firebaseid)
  );
  return filteredTasks;
}

/**
 * This function clears the column content.
 * Is needed before rendering the search result.
 *
 */
function clearColumnContent() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/**
 * This function renders in the task detail dialog the edit template with all functionalities of add task
 *
 * @param {number} i - index of the global tasks array
 */
async function editTask(i) {
  document.getElementById("taskEditContainer").innerHTML = "";
  document.getElementById("taskEditContainer").innerHTML = editTaskTemplate(i);
  document.getElementById("overlayAddTask").innerHTML = "";
  changePrio(tasks[i].prio, tasks[i].prio + "SVG");
  await initAddTaskForEdit();
  await loadTasksData();
  getSelectedContacts(i);
  renderSelectedContacts();
  markCheckBoxInEdit(selectedContacts);
  getSubtasks(i);
  renderSubtasks();
}

/**
 * This function pushes the contacts of the task in the global array selected contacts
 *
 * @param {number} i - index of the global tasks array
 */
function getSelectedContacts(i) {
  selectedContacts = [];
  if (tasks[i].contacts != undefined) {
    let contactKeys = Object.keys(tasks[i].contacts);
    for (let index = 0; index < contactKeys.length; index++) {
      selectedContacts.push({
        firebaseid: contactKeys[index],
        color: tasks[i].contacts[contactKeys[index]]["color"],
        email: tasks[i].contacts[contactKeys[index]]["email"],
        name: tasks[i].contacts[contactKeys[index]]["name"],
        phone: tasks[i].contacts[contactKeys[index]]["phone"],
      });
    }
  } else {
    return;
  }
}

/**
 * This function marks the selected Contacts in the drop down
 *
 * @param {array} selectedContacts - the global array selected contacts
 */
function markCheckBoxInEdit(selectedContacts) {
  for (let i = 0; i < selectedContacts.length; i++) {
    let contactIndex = contacts.findIndex(
      (contact) => contact.firebaseid === selectedContacts[i].firebaseid
    );
    let checkbox = document.getElementById("checkbox" + contactIndex);
    let contact = document.getElementById("contact" + contactIndex);
    checkbox.checked = true;
    contact.style.backgroundColor = "#2a3647";
    contact.style.color = "#ffffff";
  }
}

/**
 * This function makes it possible to check the subtasks in task details and update it in firebase
 *
 * @param {number} i - index of the global tasks array
 * @param {number} statusIndex - the index of the subtask in the task
 */
async function checkSubtask(i, statusIndex) {
  let checkbox = document.getElementById("subtask" + i + statusIndex);
  if (checkbox.checked) {
    putData(`tasks/${tasks[i].firebaseid}/subtasks/${statusIndex}/done`, true);
  } else {
    putData(`tasks/${tasks[i].firebaseid}/subtasks/${statusIndex}/done`, false);
  }
}

/**
 * This function pushes the subtask in and his status in the global arrays subtasks and statusSubtasks
 *
 * @param {number} i - index of the global tasks array
 *
 */
function getSubtasks(i) {
  subtasks = [];
  if (tasks[i].subtasks != undefined) {
    let subtaskKeys = Object.keys(tasks[i].subtasks);
    for (let index = 0; index < subtaskKeys.length; index++) {
      subtasks.push(tasks[i].subtasks[subtaskKeys[index]]["title"]);
      statusSubtasks.push(tasks[i].subtasks[subtaskKeys[index]]["done"]);
    }
  } else {
    return;
  }
}

/**
 * This function updates the task in firebase if validation is ok
 *
 * @param {number} i - index of the global tasks array
 *
 */
async function updateTask(i) {
  let title = document.getElementById("title").value.length;
  let date = document.getElementById("date").value.length;
  let data = collectEditTaskData(i);
  if (title > 0 && date > 0) {
    validateInputFields("title", "titleValidation");
    validateInputFields("date", "dateValidation");
    await putData(`tasks/${tasks[i].firebaseid}`, data);
    await loadTasksData();
    renderTaskDetails(i);
    showMessage("Task successfully edited");
  } else {
    validateInputFields("title", "titleValidation");
    validateInputFields("date", "dateValidation");
  }
}

/**
 * This function collects all values from the input fields and returns it in a object
 *
 * @param {number} i - index of the global tasks array
 *
 */
function collectEditTaskData(i) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = returnPrio();
  let data = {
    title: title,
    description: description,
    date: date,
    category: tasks[i].category,
    prio: prio,
    assignTo: getContactsForFB(),
    subtasks: getEditSubtasksForFB(),
    type: tasks[i].type,
  };
  return data;
}

/**
 * This function collects the subtask in in edit mode returns it in a object
 *
 */
function getEditSubtasksForFB() {
  checkSubtaskStatusArray();
  let subtasksOBJ = {};
  for (let i = 0; i < subtasks.length; i++) {
    subtasksOBJ[i] = {
      title: subtasks[i],
      done: statusSubtasks[i],
    };
  }
  return subtasksOBJ;
}

/**
 * This function checks if the subtasks and statusSubtasks array have the same length.
 * If not the statusSubtasks array will be filled up with the false value.
 *
 */
function checkSubtaskStatusArray() {
  if (subtasks.length != statusSubtasks.length) {
    let difference = subtasks.length - statusSubtasks.length;
    for (let i = 0; i < difference; i++) {
      statusSubtasks.push(false);
    }
  } else {
    return;
  }
}

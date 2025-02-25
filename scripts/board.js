let tasks = [];
let searchedTasks = [];
let currentDraggedElement;
let statusSubtasks = [];
let taskCategorys = ["todo", "inProgress", "awaitFeedback", "done"];
let categorysEmpty = ["in to do", "in progress", "in await Feedback", "done"];

/**
 * This function initialize the board page first tasks were loaded from firebase and pushed in a global array. Then Tasks will be rendered.
 * After that the logged in user will updated in header icon and the nav link highlighted
 *
 */
async function initBoard() {
  await loadTasksData();
  renderTasks(tasks);
  initLoad();
  highlightNavLink("boardLink", "boardLinkResp");
}

async function initAddTaskBoard() {
  await loadContactsData();
  renderDropdownContacts();
  changePrio("medium", "mediumSVG");
  renderCategorys();
  submitSubtaskWithEnter();
  initLoad();
}

/**
 * This function initialize the neccesary function to use the functionalitys from the add task page.
 *
 */
async function initAddTaskForEdit() {
  await loadContactsData();
  renderDropdownContacts();
  submitSubtaskWithEnter();
  initLoad();
}

/**
 * This function loades the tasks from firebase an push the objects in the global tasks array
 *
 */
async function loadTasksData(path = "/tasks") {
  tasks = [];
  id = 0;
  try {
    let taskResponse = await fetch(FB_URL + path + ".json");
    let taskResponseToJson = await taskResponse.json();
    let taskKeys = Object.keys(taskResponseToJson);
    for (let i = 0; i < taskKeys.length; i++) {
      let taskKey = taskKeys[i];
      fillTasksArray(taskResponseToJson, taskKey);
      id++;
    }
  } catch (error) {
    showMessage("Error during loading of data");
  }
}

/**
 * This function pushes a object in the global tasks array in loadTasksData function
 *
 * @param {json} taskResponseToJson - the json with tasks from the firebase
 * @param {string} taskKey - is a single taskkey of the taskKeys array
 *
 */
function fillTasksArray(taskResponseToJson, taskKey) {
  tasks.push({
    firebaseid: taskKey,
    id: id,
    type: taskResponseToJson[taskKey].type,
    category: taskResponseToJson[taskKey].category,
    title: taskResponseToJson[taskKey].title,
    dscr: taskResponseToJson[taskKey].description,
    date: taskResponseToJson[taskKey].date,
    prio: taskResponseToJson[taskKey].prio,
    contacts: taskResponseToJson[taskKey].assignTo,
    subtasks: taskResponseToJson[taskKey].subtasks,
  });
}

/**
 * This function renders the tasks in the respective board column.
 * To do this, it runs through the global array taskCategorys and filters the respective tasks by category from the global tasks.
 *
 * @param {array} taskArray - the global tasks array
 *
 */
function renderTasks(taskArray) {
  for (let index = 0; index < taskCategorys.length; index++) {
    let category = taskArray.filter(
      (task) => task.type === taskCategorys[index]
    );
    document.getElementById(taskCategorys[index]).innerHTML = "";
    if (category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        let taskObj = category[i];
        document.getElementById(taskCategorys[index]).innerHTML +=
          getTaskTemplate(taskObj, i);
        renderContactIntials(taskObj, i);
        renderSubTasks(taskObj, i);
      }
    } else {
      document.getElementById(taskCategorys[index]).innerHTML =
        getNoTaskTemplate(categorysEmpty[index]);
    }
  }
}

/**
 * This function render all contact Intials in the task card
 *
 * @param {object} task - the single task object
 * @param {number} i - the index of the object in global task array
 *
 */
function renderContactIntials(task, i) {
  if (task.contacts != undefined) {
    let contactKeys = Object.keys(task.contacts);
    let leftPos = 0;
    let counter = 0;
    for (let index = 0; index < contactKeys.length; index++) {
      if (index <= 3) {
        let name = task.contacts[contactKeys[index]].name;
        let intials = getIntialsOfContact(name);
        let color = task.contacts[contactKeys[index]].color;
        document.getElementById(task.type + i).innerHTML +=
          getIntialTemplateForBoard(intials, color, leftPos);
        leftPos += 24;
        counter++;
      }
    }
    if (counter < contactKeys.length) {
      document.getElementById(task.type + i).innerHTML +=
        getRemainingIntialsTemplate(counter, contactKeys.length, leftPos);
      leftPos += 24;
    }
  } else {
    return;
  }
}

/**
 * This function return the Intials of the contact
 *
 * @param {string} contact - the name of the contact
 *
 */
function getIntialsOfContact(contact) {
  let intials = "";
  let splittedContact = contact.split(" ");
  for (let i = 0; i < splittedContact.length; i++) {
    intials += splittedContact[i][0].toUpperCase();
  }
  return intials;
}

/**
 * This function renders the subtasks of the task
 *
 * @param {object} task - the single task object
 * @param {number} i - the index of the object in global task array
 */
function renderSubTasks(task, i) {
  if (task.subtasks != undefined) {
    let subtasksKeys = Object.keys(task.subtasks);
    let amountDone = 0;
    let amountSubTasks = subtasksKeys.length;
    for (let index = 0; index < subtasksKeys.length; index++) {
      if (task.subtasks[subtasksKeys[index]].done === true) {
        amountDone++;
      }
    }
    document.getElementById("subtask" + task.type + i).innerHTML =
      getSubTaskTextTemplate(amountDone, amountSubTasks);
    updateStatusBar(amountDone, amountSubTasks, task, i);
  } else {
    document.getElementById("subtaskStatus" + task.type + i).innerHTML = "";
    return;
  }
}

/**
 * This function assigns the value of the taskid to the variable currentDraggedElement when it dragging starts
 *
 * @param {number} id - id of the task element
 *
 */
function startDragging(id) {
  currentDraggedElement = id;
  document.getElementById("task" + id).classList.add("dragging");
}

/**
 * allows drag and drop in the html container
 *
 * @param {Event} ev - event object
 *
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * This function sets the category of the element to the cateogry where it is dropped.
 * The tasks are then rendered again and the category is updated to the tasks in the firebase
 *
 * @param {string} category - category where an element is moved to
 *
 */
function moveTo(category) {
  tasks[currentDraggedElement].type = category;
  renderTasks(tasks);
  document.getElementById(category).classList.remove("dragAreaHighlight");
  putData(`tasks/${tasks[currentDraggedElement].firebaseid}/type`, category);
}

/**
 * This function highlights the dragged area
 *
 * @param {number} id - id of the task element
 *
 */
function highlight(id) {
  document.getElementById(id).classList.add("dragAreaHighlight");
}

function stopRotate(id) {
  document.getElementById(id).classList.remove("dragging");
}

/**
 * This function remove the highlighting of the dragged area
 *
 * @param {number} id - id of the task element
 *
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("dragAreaHighlight");
}

/**
 * This function remove the highlighting of the dragged area
 *
 * @param {number} id - id of the task element
 *
 */
function updateStatusBar(amountDone, amountSubTasks, task, i) {
  let percent = (amountDone / amountSubTasks) * 100;
  percent = Math.round(percent);
  document.getElementById("statusBar" + task.type + i).style.width = `${
    percent + "%"
  }`;
}

/**
 * This function open the add task overlay in the board and loads functionality of the add task page
 *
 * @param {string} type - the type in which column the task will be added e.g. todo
 *
 */
async function openAddTaskOverlay(type) {
  document.getElementById("overlayAddTask").innerHTML = getAddTaskTemplate();
  let form = document.getElementById("addTaskForm");
  form.setAttribute("onsubmit", `submitForm('${type}'); return false;`);
  document.getElementById("overlayAddTask").classList.remove("overlayClosed");
  await initAddTaskBoard();
  await loadTasksData();
}

/**
 * This function close the add task overlay
 *
 */
function closeAddTaskOverlay() {
  document.getElementById("overlayAddTask").classList.add("overlayClosed");
}

/**
 * This function open the task details and renders the corrosponding task informations
 *
 * @param {number} i - index of the global tasks array
 *
 */
function openTaskDetails(i) {
  document.getElementById("taskEditContainer").innerHTML = "";
  document.getElementById("taskEditContainer").innerHTML =
    getTaskDetailTemplate(i);
  renderContactsInTaskDetail(i);
  renderSubTasksInDetail(i);
  document.getElementById("overlayEditTask").classList.remove("overlayClosed");
}

/**
 * This function rendering all tasks details when the overlay is open
 *
 * @param {number} i - index of the global tasks array
 *
 */
function renderTaskDetails(i) {
  document.getElementById("taskEditContainer").innerHTML = "";
  document.getElementById("taskEditContainer").innerHTML =
    getTaskDetailTemplate(i);
  renderContactsInTaskDetail(i);
  renderSubTasksInDetail(i);
}

/**
 * This function closes the edit task overlay. By closing the
 * By closing, the tasks in the board are rendered and thereby updated
 *
 */
async function closeEditTaskOverlay() {
  subtasks = [];
  statusSubtasks = [];
  selectedContacts = [];
  await loadTasksData();
  renderTasks(tasks);
  document.getElementById("overlayEditTask").classList.add("overlayClosed");
}

/**
 * This function renders the contacts in the task details
 *
 * @param {number} i - index of the global tasks array
 *
 */
function renderContactsInTaskDetail(i) {
  document.getElementById("detailContactsList").innerHTML = "";
  if (tasks[i].contacts != undefined) {
    let contactKeys = Object.keys(tasks[i].contacts);
    for (let index = 0; index < contactKeys.length; index++) {
      let name = tasks[i].contacts[contactKeys[index]].name;
      let intials = getIntialsOfContact(name);
      let color = tasks[i].contacts[contactKeys[index]].color;
      document.getElementById("detailContactsList").innerHTML +=
        getDetialContactListItemTemplate(name, intials, color);
    }
  } else {
    return;
  }
}

/**
 * This function renders the subtasks in the task details
 *
 * @param {number} i - index of the global tasks array
 *
 */
async function renderSubTasksInDetail(i) {
  await loadTasksData();
  document.getElementById("subtasksList").innerHTML = "";
  if (tasks[i].subtasks != undefined) {
    let subtasksKeys = Object.keys(tasks[i].subtasks);
    for (let index = 0; index < subtasksKeys.length; index++) {
      let status = tasks[i].subtasks[subtasksKeys[index]].done;
      let statusIndex = subtasksKeys[index];
      let title = tasks[i].subtasks[subtasksKeys[index]].title;
      document.getElementById("subtasksList").innerHTML +=
        getDetialSubtaskListItemTemplate(status, title, i, statusIndex);
    }
  } else {
    return;
  }
}

/**
 * This function deletes the task in firebase.
 * After that the tasks data will be loaded, the board renderd, the overlay closed and a message displayed
 *
 * @param {number} i - index of the global tasks array
 *
 */
async function deleteTask(i) {
  await deleteData(`/tasks/${tasks[i].firebaseid}`);
  await loadTasksData();
  renderTasks(tasks);
  closeEditTaskOverlay();
  showMessage("Task successfully deleted");
}

/**
 * This function opens in mobile view the dialog to move the task to another category.
 *
 * @param {number} i - index of the global tasks array
 *
 */
function openCloseTaskMoveDialogMobile(i) {
  let dialogRef = document.getElementById("moveDialog" + tasks[i].id);
  dialogRef.classList.toggle("dNone");
}

/**
 * This function moves the task to another category.
 *
 * @param {number} taskId - id of the task
 * @param {string} category - category where task should be moved to
 *
 */
function moveToInMobile(taskId, category) {
  tasks[taskId].type = category;
  renderTasks(tasks);
  putData(`tasks/${tasks[taskId].firebaseid}/type`, category);
}

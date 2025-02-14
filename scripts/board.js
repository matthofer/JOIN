let tasks = [];

async function initBoard() {
  await initAddTask();
  await loadTasksData();
  renderTasks();
}

async function loadTasksData(path = "/tasks") {
  tasks = [];
  id = 0;
  try {
    let taskResponse = await fetch(FB_URL + path + ".json");
    let taskResponseToJson = await taskResponse.json();
    let taskKeys = Object.keys(taskResponseToJson);
    for (let i = 0; i < taskKeys.length; i++) {
      tasks.push({
        firebaseid: taskKeys[i],
        id: id,
        type: taskResponseToJson[taskKeys[i]].type,
        category: taskResponseToJson[taskKeys[i]].category,
        title: taskResponseToJson[taskKeys[i]].title,
        dscr: taskResponseToJson[taskKeys[i]].description,
        date: taskResponseToJson[taskKeys[i]].date,
        prio: taskResponseToJson[taskKeys[i]].prio,
        contacts: taskResponseToJson[taskKeys[i]].assignTo,
        subtasks: taskResponseToJson[taskKeys[i]].subtasks,
      });
      id++;
    }
  } catch (error) {
    showMessage("Error during loading of data");
  }
}

function renderTasks() {
  renderTodo();
  renderInProgress();
  renderAwaitFeedback();
  renderDone();
}

function renderTodo() {
  let todo = tasks.filter((task) => task.type == "todo");
  document.getElementById("todo").innerHTML = "";
  if (todo.length > 0) {
    for (let taskIndex = 0; taskIndex < todo.length; taskIndex++) {
      let type = todo[taskIndex];
      document.getElementById("todo").innerHTML += getTaskTemplate(type);
    }
  } else {
    document.getElementById("todo").innerHTML = getNoTaskTemplate("in to do");
  }
}

function renderInProgress() {
  let inProgress = tasks.filter((task) => task.type == "inProgress");
  document.getElementById("inProgress").innerHTML = "";
  if (inProgress.length > 0) {
    for (let taskIndex = 0; taskIndex < inProgress.length; taskIndex++) {
      let type = inProgress[taskIndex];
      document.getElementById("inProgress").innerHTML += getTaskTemplate(type);
    }
  } else {
    document.getElementById("inProgress").innerHTML =
      getNoTaskTemplate("in progress");
  }
}

function renderAwaitFeedback() {
  let awaitFeedback = tasks.filter((task) => task.type == "awaitFeedback");
  document.getElementById("awaitFeedback").innerHTML = "";
  if (awaitFeedback.length > 0) {
    for (let taskIndex = 0; taskIndex < awaitFeedback.length; taskIndex++) {
      let type = awaitFeedback[taskIndex];
      document.getElementById("awaitFeedback").innerHTML +=
        getTaskTemplate(type);
    }
  } else {
    document.getElementById("awaitFeedback").innerHTML =
      getNoTaskTemplate("in await Feedback");
  }
}

function renderDone() {
  let done = tasks.filter((task) => task.type == "done");
  document.getElementById("done").innerHTML = "";
  if (done.length > 0) {
    for (let taskIndex = 0; taskIndex < done.length; taskIndex++) {
      let type = done[taskIndex];
      document.getElementById("done").innerHTML += getTaskTemplate(type);
    }
  } else {
    document.getElementById("done").innerHTML = getNoTaskTemplate("done");
  }
}

function openAddTaskOverlay() {
  document.getElementById("overlayAddTask").classList.remove("overlayClosed");
}

function closeAddTaskOverlay() {
  document.getElementById("overlayAddTask").classList.add("overlayClosed");
}

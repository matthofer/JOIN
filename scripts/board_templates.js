function getTaskTemplate(task, i) {
  return `<div onclick="openTaskDetails(${
    task.id
  })" draggable="true" ondragstart="startDragging(${
    task.id
  })" class="taskWrapper">
                <div class="task">
                    <div id="category" class="category${task.category[0]}">${
    task.category
  }</div>
                    <div class="taskTitleAndDscr">
                        <p id="taskTitle" class="taskTitle">${task.title}</p>
                        <p id="taskDscr" class="taskDscr">${task.dscr.substr(
                          0,
                          40
                        )}...</p>
                    </div>
                    <div class="subtaskStatus">
                        <div class="progressBar">
                          <div id="statusBar${
                            task.type
                          }${i}" class="statusBar"></div>
                        </div>
                        <span class="subTaskText">
                          <span id="subtask${
                            task.type
                          }${i}" class="statusTextSubtasks">
                            <p id="subTaskFrom">1</p>/<p id="subTaskTo">2</p>
                          </span>
                          <p>Substasks</p>
                        </span>
                      </div>
                    <div class="intialsAndPrio">
                        <div id="${task.type}${i}" class="initialWrapper">
                          
                        </div>

                        <img
                          id="prio"
                          class="prio"
                          src="./assets/icons/prio_${task.prio}.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>`;
}

function getNoTaskTemplate(type) {
  return `<div class="noTask">
                <p>No Tasks ${type}</p>
          </div>`;
}

function getIntialTemplateForBoard(intials, color, leftPos) {
  return `<div class="intial iPos" style="background-color: ${color}; left: ${leftPos}px">${intials}</div>`;
}

function getRemainingIntialsTemplate(counter, lenContacts, leftPos) {
  return `<div class="intial iPos" style="left: ${leftPos}px">+${
    lenContacts - counter
  }</div>`;
}

function getSubTaskTextTemplate(doneSubTasks, amountSubTasks) {
  return `<p id="subTaskFrom">${doneSubTasks}</p>/<p id="subTaskTo">${amountSubTasks}</p>`;
}

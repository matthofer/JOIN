function getTaskTemplate(task, i) {
  return `<div draggable="true" ondragstart="id" class="taskWrapper">
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
                    <div id="statusBar" class="statusBar"></div>
                        </div>
                        <span class="subTaskText">
                          <span class="statusTextSubtasks"
                            ><p id="subTaskFrom">1</p>
                            /
                            <p id="subTaskTo">2</p>
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

function getIntialTemplateForBoard(intials, i, color) {
  return `<div class="intial i${i}" style="background-color: ${color}">${intials}</div>`;
}

function getTaskTemplate() {
  return `<div draggable="true" ondragstart="id" class="taskWrapper">
                <div class="task">
                    <div id="category" class="category">User Story</div>
                    <div class="taskTitleAndDscr">
                        <p id="taskTitle" class="taskTitle">
                          Kochwelt Page & Recipe Recommender
                        </p>
                        <p id="taskDscr" class="taskDscr">
                          Build start page with recipe recommendation...
                        </p>
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
                        <div id="intials" class="initialWrapper">
                          <div class="intial i1">AM</div>
                          <div class="intial i2">EM</div>
                          <div class="intial i3">MB</div>
                    </div>
                        <img
                          id="prio"
                          class="prio"
                          src="./assets/icons/prio_medium.svg"
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

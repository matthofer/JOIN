/**
 * This function returns a formatted date -> XX/XX/XXXX
 *
 * @param {date} date - date value
 */
function formatDate(date) {
  let year = date.substr(0, 4);
  let month = date[5] + date[6];
  let day = date[8] + date[9];
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

/**
 * This function returns a string with the first letter in upper case
 *
 * @param {string} word - any string
 */
function fristLetterUpperCase(word) {
  let firstLetter = word[0];
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  return (capitalizedWord = firstLetterCap + remainingLetters);
}

/**
 * This function returns the html template of a single task element
 *
 * @param {object} task - a object from the global tasks array
 * @param {number} i - the index of the object in the global tasks array
 *
 */
function getTaskTemplate(task, i) {
  return `<div onmouseleave="stopRotate('task${task.id}')" id="task${
    task.id
  }" onclick="openTaskDetails(${
    task.id
  })" draggable="true" ondragstart="startDragging(${
    task.id
  })" class="taskWrapper">
                <div class="task">
                    <div class="taskHead">
                      <div id="category" class="category${task.category[0]}">${
    task.category
  }</div>
                      <div class="mobileMoveContainer">
                        <div id="moveBtn" onclick="openCloseTaskMoveDialogMobile(${
                          task.id
                        });event.stopPropagation()">
                          <img  class="moveTaskMobile" src="./assets/icons/move_vert_dark.svg"/>
                        </div>
                        <div id="moveDialog${task.id}" class="moveDialog dNone">
                          <p>Move to</p>
                          <p onclick="moveToInMobile(${
                            task.id
                          }, 'todo'); event.stopPropagation()" class="moveTarget">• Todo</p>
                          <p onclick="moveToInMobile(${
                            task.id
                          }, 'inProgress'); event.stopPropagation()" class="moveTarget">• In Progress</p>
                          <p onclick="moveToInMobile(${
                            task.id
                          }, 'awaitFeedback'); event.stopPropagation()" class="moveTarget">• Await feedback</p>
                          <p onclick="moveToInMobile(${
                            task.id
                          }, 'done'); event.stopPropagation()" class="moveTarget">• Done</p>
                        </div>
                      </div>
                    </div>
                    <div class="taskTitleAndDscr">
                        <p id="taskTitle" class="taskTitle">${task.title}</p>
                        <p id="taskDscr" class="taskDscr">${
                          task.dscr.length >= 40
                            ? task.dscr.substr(0, 40) + "..."
                            : task.dscr
                        }</p>
                    </div>
                    <div id="subtaskStatus${
                      task.type
                    }${i}"class="subtaskStatus">
                        <div class="progressBar">
                          <div id="statusBar${
                            task.type
                          }${i}" class="statusBar"></div>
                        </div>
                        <span class="subTaskText">
                          <span id="subtask${
                            task.type
                          }${i}" class="statusTextSubtasks">
                            <p id="subTaskFrom">0</p>/<p id="subTaskTo">0</p>
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

/**
 * This function returns the html template a no task element. This will be used if a board column is empty
 *
 * @param {string} type - the type of the tasks e.g. to do
 *
 */
function getNoTaskTemplate(type) {
  return `<div class="noTask">
                <p>No Tasks ${type}</p>
          </div>`;
}

/**
 * This function returns the html template a contact intial for the task card
 *
 * @param {string} initials - initials of the contact
 * @param {string} color - color for the contact icon
 * @param {string} leftPos - for positioning the contact icons in a overlapping way
 *
 */
function getIntialTemplateForBoard(intials, color, leftPos) {
  return `<div class="intial iPos" style="background-color: ${color}; left: ${leftPos}px">${intials}</div>`;
}

/**
 * This function returns the html template for the remaining contact intial of the task card
 *
 * @param {number} counter - the number of contact icons which are already displayed
 * @param {number} lenContacts - the amount of contacts which are belongs to the task
 * @param {string} leftPos - for positioning the contact icons in a overlapping way
 *
 */
function getRemainingIntialsTemplate(counter, lenContacts, leftPos) {
  return `<div class="intial iPos" style="left: ${leftPos}px">+${
    lenContacts - counter
  }</div>`;
}

/**
 * This function returns the html template for display the status of done and open subtasks in the task
 *
 * @param {number} doneSubTasks - number of done subtasks
 * @param {number} amountSubTasks - amount of subtasks in the task
 *
 */
function getSubTaskTextTemplate(doneSubTasks, amountSubTasks) {
  return `<p id="subTaskFrom">${doneSubTasks}</p>/<p id="subTaskTo">${amountSubTasks}</p>`;
}

/**
 * This function returns the html template if no subtask is in the task
 *
 */
function getNoSubTaskTextTemplate() {
  return `<p>No Subtasks</p>`;
}

/**
 * This function returns the html template for the task detail
 *
 * @param {number} i - index of the task in global task array
 *
 */
function getTaskDetailTemplate(i) {
  return `<div class="taskDetailHeader">
                  <div id="category" class="category${tasks[i].category[0]}">${
    tasks[i].category
  }</div>
                  <img onclick="closeEditTaskOverlay()" src="./assets/icons/close.svg">
                </div>
                <h2>${tasks[i].title}</h2>
                <p>${tasks[i].dscr}</p>
                <div class="taskDetails">
                  <div class="detail">
                    <p class="detailType text">Due date:</p>
                    <p>${formatDate(tasks[i].date)}</p>
                  </div>
                  <div class="detail">
                    <p class="detailType text">Priority:</p>
                    <div class="detailPrio">
                      <p>${fristLetterUpperCase(tasks[i].prio)}</p>
                      <img src="./assets/icons/prio_${tasks[i].prio}.svg">
                    </div>
                  </div>
                </div>
                <div class="detailContacts">
                  <p class="text">Assigned to:</p>
                  <div id="detailContactsList"  class="detailContactsList"></div>
                </div>
                <div class="detailSubtasks">
                  <p class="text">Subtasks</p>
                  <div id="subtasksList" class="subtasksList"></div>
                </div>
                <div class="taskDetailButtons">
                  <div onclick="deleteTask(${i})" class="taskDetailButton">
                    <img src="./assets/icons/delete_contact.svg">
                    <p>Delete</p>
                  </div>
                  <div class="taskDetailButtonsDivider"></div>
                  <div onclick="editTask(${i})" class="taskDetailButton">
                    <img src="./assets/icons/edit_contact.svg">
                    <p>Edit</p>
                  </div>
                </div>`;
}

/**
 * This function returns the html template for a contact intial icon
 *
 * @param {string} name - name of the contact
 * @param {string} initials - initials of the contact
 * @param {string} color - color of the contact icon
 */
function getDetialContactListItemTemplate(name, initials, color) {
  return `<div class="detialContactListItem">
            <div class="intial" style="background-color: ${color}">${initials}</div>
            <p>${name}</p>
          </div>`;
}

/**
 * This function returns the html template for a checkbox in task details
 *
 * @param {boolean} status - status of subtask
 * @param {string} title - title of subtask
 * @param {number} i - index of the task in global task array
 * @param {number} statusIndex - index of the subtask in the subtask array of the task
 */
function getDetialSubtaskListItemTemplate(status, title, i, statusIndex) {
  if (status === true) {
    return ` <div class="subtasksListItem">
              <input id="subtask${
                i + statusIndex
              }" class="subTaskCheckBoxEdit" onclick="checkSubtask(${i}, '${statusIndex}'); event.stopPropagation()" name="checkbox" type="checkbox" checked>
              <label for="subtask${i + statusIndex}"></label>
              <p>${title}</p>
            </div>`;
  } else {
    return ` <div class="subtasksListItem">
              <input id="subtask${
                i + statusIndex
              }" class="subTaskCheckBoxEdit" onclick="checkSubtask(${i}, '${statusIndex}'); event.stopPropagation()" name="checkbox" type="checkbox" >
              <label for="subtask${i + statusIndex}"></label>
              <p>${title}</p>
            </div>`;
  }
}

/**
 * This function returns the html template for editing a task
 *
 * @param {number} i - index of the task in global task array
 *
 */
function editTaskTemplate(i) {
  return `  <div class="editWrapper">
                <div class="addTaskOverlayContainerHeadEdit">
                  <img onclick="closeEditTaskOverlay()"
                    onclick="closeAddTaskOverlay()"
                    src="./assets/icons/close.svg"
                  />
                </div>
                <div id="addTaskForm" class="formEdit">
                  <div class="formWrapper editFormWrapper">
                      <div class="leftColumn leftColumnEdit">
                          <div class="titles">
                              <span>Title <p>*</p></span>
                              <input value="${tasks[i].title}" name="title" type="text" placeholder="Enter a title" id="title" onblur="getBlueBorder('title')">
                              <p id="titleValidation" class="required d-none">This field is required</p>
                          </div>

                          <div class="titles">
                              <span>Description</span>
                              <textarea name="description" id="description" onblur="getBlueBorder('description')"
                                  placeholder="Enter a Description">${tasks[i].dscr}</textarea>
                          </div>
                          <div class="titles dNone">
                              <span>Category <p>*</p></span>
                              <input readonly id="categorysDropdown"
                                  onclick="toggleDropdownCategorys(); event.stopPropagation()" type="text"
                                  name="category" placeholder="Select task category"
                                  onblur="getBlueBorder('categorysDropdown')">
                              <div class="categoryDropdown" id="categorys"></div>
                              <p id="categoryValidation" class="required d-none">This field is required</p>

                          </div>

                      </div>

                      <div class="rightColumn rightColumnEdit">
                          <div class="titles">
                              <span>Due date <p>*</p></span>
                              <input value="${tasks[i].date}" type="text" name="date" id="date" placeholder="dd/mm/yyyy"
                                  onfocus="(this.type='date')" ontouchstart="(this.type='date')" onblur="if (!this.value) this.type='text'; getBlueBorder('date')"
                                  >
                              <p id="dateValidation" class="required d-none">This field is required</p>

                          </div>

                          <div class="titles">
                              <span>Prio</span>
                              <div class="prioSection">
                                  <button type="button" id="urgent" onclick="changePrio('urgent', 'urgentSVG')">
                                      Urgent
                                      <svg id="urgentSVG" width="21" height="16" viewBox="0 0 21 16" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                                              fill="#FF3D00" />
                                          <path
                                              d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                                              fill="#FF3D00" />
                                      </svg>
                                  </button>
                                  <button type="button" id="medium" onclick="changePrio('medium', 'mediumSVG')"
                                      class="defaultBtn">
                                      Medium
                                      <svg id="mediumSVG" width="21" height="8" viewBox="0 0 21 8" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                                              fill="#FFA800" />
                                          <path
                                              d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                                              fill="#FFA800" />
                                      </svg>
                                  </button>
                                  <button type="button" id="low" onclick="changePrio('low', 'lowSVG')">
                                      Low
                                      <svg id="lowSVG" width="21" height="16" viewBox="0 0 21 16" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                                              fill="#7AE229" />
                                          <path
                                              d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                                              fill="#7AE229" />
                                      </svg>
                                  </button>
                              </div>
                          </div>
                          <div class="titles">
                              <span>Assigned to</span>
                              <input onclick="toggleDropdownContacts(), event.stopPropagation()"
                                  onkeyup="filterContacts()" type="text" id="contactsDropdown"
                                  name="contactsDropdown" placeholder="Select contacts to assign">
                              <div class="contacts" id="contacts"></div>
                              <div class="initialsContacts" id="initialsContacts"></div>
                          </div>

                          <div class="titles subtasksEdit">
                              <span>Subtasks</span>
                              <input onkeyup="changeSubtasksIcons()" type="text" id="subtasks" name="subtask"
                                  placeholder="Add new subtask">
                              <p id="subtaskValidation" class="required d-none">You can´t save empty subtask´s</p>

                              <div class="subtasksMenu d-none" id="subtasksMenu">
                                  <img onclick="clearSubtasksInput()" src="./assets/icons/cancel.svg"
                                      alt="a cancel cross" srcset="">
                                  <div class="dividerSubtasks"></div>
                                  <img onclick="saveSubtasks()" src="./assets/icons/checkBlue.svg" alt=""
                                      srcset="">
                              </div>
                              <div class="renderedSubtasks subScroll" id="renderedSubtasks">
                              </div>
                          </div>
                      </div>
                      
                  </div>
                  <div class="bottomSectionEditTask">
                      <div class="buttonAreaResp">
                          <button onclick="updateTask(${i})" class="submitEdit">Ok
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 8.96582L5 12.9658L13 1.46582" stroke="#2A3647" stroke-width="2"
                                      stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
              
            </div>`;
}

/**
 * This function returns the html template for add task to use it in the board
 *
 * @param {number} i - index of the task in global task array
 *
 */
function getAddTaskTemplate() {
  return `<div class="addTaskOverlayContainer">
                <div class="addTaskOverlayContainerHead">
                  <h1 class="mainHeadline">Add Task</h1>
                  <div class="closeAddTask">
                  <img
                    onclick="closeAddTaskOverlay()"
                    src="./assets/icons/close.svg"
                  />
                  </div>
                </div>
                <form id="addTaskForm">
                  <div class="formWrapper formWrapperResp">
                      <div class="leftColumn leftColumnAdd">
                          <div class="titles">
                              <span>Title <p>*</p></span>
                              <input name="title" type="text" placeholder="Enter a title" id="title" onblur="getBlueBorder('title')">
                              <p id="titleValidation" class="required d-none">This field is required</p>
                          </div>

                          <div class="titles">
                              <span>Description</span>
                              <textarea name="description" id="description" onblur="getBlueBorder('description')"
                                  placeholder="Enter a Description"></textarea>
                          </div>

                          <div class="titles">
                              <span>Assigned to</span>
                              <input onclick="toggleDropdownContacts(), event.stopPropagation()"
                                  onkeyup="filterContacts()" type="text" id="contactsDropdown"
                                  name="contactsDropdown" placeholder="Select contacts to assign">
                              <div class="contacts" id="contacts"></div>
                              <div class="initialsContacts" id="initialsContacts"></div>
                          </div>
                      </div>

                      <div class="divider"></div>

                      <div class="rightColumn rightColumnAddTask">
                          <div class="titles">
                              <span>Due date <p>*</p></span>
                              <input type="text" name="date" id="date" placeholder="dd/mm/yyyy"
                                  onfocus="(this.type='date')" ontouchstart="(this.type='date')" onblur="if (!this.value) this.type='text'; getBlueBorder('date')"
                                  >
                              <p id="dateValidation" class="required d-none">This field is required</p>

                          </div>

                          <div class="titles">
                              <span>Prio</span>
                              <div class="prioSection">
                                  <button type="button" id="urgent" onclick="changePrio('urgent', 'urgentSVG')">
                                      Urgent
                                      <svg id="urgentSVG" width="21" height="16" viewBox="0 0 21 16" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                                              fill="#FF3D00" />
                                          <path
                                              d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                                              fill="#FF3D00" />
                                      </svg>
                                  </button>
                                  <button type="button" id="medium" onclick="changePrio('medium', 'mediumSVG')"
                                      class="defaultBtn">
                                      Medium
                                      <svg id="mediumSVG" width="21" height="8" viewBox="0 0 21 8" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z"
                                              fill="#FFA800" />
                                          <path
                                              d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z"
                                              fill="#FFA800" />
                                      </svg>
                                  </button>
                                  <button type="button" id="low" onclick="changePrio('low', 'lowSVG')">
                                      Low
                                      <svg id="lowSVG" width="21" height="16" viewBox="0 0 21 16" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                                              fill="#7AE229" />
                                          <path
                                              d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                                              fill="#7AE229" />
                                      </svg>
                                  </button>
                              </div>
                          </div>

                          <div class="titles">
                              <span>Category <p>*</p></span>
                              <input readonly id="categorysDropdown"
                                  onclick="toggleDropdownCategorys(); event.stopPropagation()" type="text"
                                  name="category" placeholder="Select task category"
                                  onblur="getBlueBorder('categorysDropdown')">
                              <div class="categoryDropdown" id="categorys"></div>
                              <p id="categoryValidation" class="required d-none">This field is required</p>

                          </div>

                          <div class="titles">
                              <span>Subtasks</span>
                              <input onkeyup="changeSubtasksIcons()" type="text" id="subtasks" name="subtask"
                                  placeholder="Add new subtask">
                              <p id="subtaskValidation" class="required d-none">You can´t save empty subtask´s</p>

                              <div class="subtasksMenu d-none" id="subtasksMenu">
                                  <img onclick="clearSubtasksInput()" src="./assets/icons/cancel.svg"
                                      alt="a cancel cross" srcset="">
                                  <div class="dividerSubtasks"></div>
                                  <img onclick="saveSubtasks()" src="./assets/icons/checkBlue.svg" alt=""
                                      srcset="">
                              </div>
                              <div class="renderedSubtasks renderedSubtasksBoard" id="renderedSubtasks">
                              </div>
                          </div>
                      </div>
                      <div class="toastMSG animateToast" id="toastMSG">
                          <p>Task added to board</p>
                          <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.9544 2.75564L22.9545 23.21C22.9538 23.8125 22.7142 24.3903 22.2881 24.8163C21.862 25.2424 21.2843 25.4821 20.6817 25.4827L16.1363 25.4827C15.5338 25.4821 14.956 25.2424 14.53 24.8163C14.1039 24.3903 13.8642 23.8125 13.8636 23.21L13.8636 2.75564C13.8642 2.15306 14.1039 1.57534 14.53 1.14926C14.956 0.723172 15.5338 0.483533 16.1363 0.48293L20.6817 0.48293C21.2843 0.483533 21.862 0.723172 22.2881 1.14926C22.7142 1.57534 22.9538 2.15306 22.9544 2.75564ZM16.1363 23.21L20.6817 23.21L20.6817 2.75564L16.1363 2.75564L16.1363 23.21ZM16.1363 2.75564L16.1363 23.21C16.1357 23.8125 15.8961 24.3902 15.47 24.8163C15.0439 25.2424 14.4662 25.482 13.8636 25.4826L9.31823 25.4826C8.71566 25.482 8.13794 25.2424 7.71185 24.8163C7.28577 24.3902 7.04613 23.8125 7.04553 23.2099L7.04553 2.75561C7.04613 2.15304 7.28577 1.57532 7.71185 1.14923C8.13793 0.723148 8.71566 0.483513 9.31823 0.48291L13.8636 0.48291C14.4662 0.483512 15.0439 0.723148 15.47 1.14923C15.8961 1.57532 16.1357 2.15306 16.1363 2.75564ZM9.31823 23.2099L13.8636 23.21L13.8636 2.75564L9.31823 2.75561L9.31823 23.2099ZM9.31823 2.75561L9.31823 23.2099C9.31763 23.8125 9.07799 24.3902 8.65191 24.8163C8.22582 25.2424 7.6481 25.482 7.04553 25.4826L2.50012 25.4826C1.89755 25.482 1.31983 25.2424 0.893741 24.8163C0.467657 24.3902 0.228019 23.8125 0.227417 23.2099L0.227416 2.75561C0.228018 2.15304 0.467656 1.57532 0.89374 1.14923C1.31982 0.723148 1.89755 0.483513 2.50012 0.48291L7.04553 0.48291C7.6481 0.483513 8.22582 0.723148 8.6519 1.14923C9.07799 1.57532 9.31763 2.15304 9.31823 2.75561ZM2.50012 23.2099L7.04553 23.2099L7.04553 2.75561L2.50012 2.75561L2.50012 23.2099Z" fill="#CDCDCD"/>
                              <path d="M29.7726 2.75589L29.7726 23.2102C29.772 23.8128 29.5323 24.3905 29.1062 24.8166C28.6802 25.2427 28.1024 25.4823 27.4999 25.4829L22.9545 25.4829C22.3519 25.4823 21.7742 25.2427 21.3481 24.8166C20.922 24.3905 20.6824 23.8125 20.6817 23.21L20.6817 2.75564C20.6823 2.15306 20.922 1.57559 21.3481 1.14951C21.7742 0.723424 22.3519 0.483787 22.9544 0.483184L27.4999 0.483184C28.1024 0.483786 28.6801 0.723424 29.1062 1.14951C29.5323 1.57559 29.772 2.15331 29.7726 2.75589ZM22.9545 23.21L27.4999 23.2102L27.4999 2.75589L22.9544 2.75564L22.9545 23.21Z" fill="#CDCDCD"/>
                              </svg>           
                      </div>
                  </div>
                  <div class="bottomSection bottomSectionResp">
                      <div class="information">
                          <p>*</p>
                          <span>This field is required</span>
                      </div>
                      <div class="buttonAreaResp">
                          <button onclick="clearForm()" class="clear" type="button">Clear
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z"
                                      stroke="#2A3647" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round" />
                              </svg>
                          </button>
                          <button class="submit">Create Task
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 8.96582L5 12.9658L13 1.46582" stroke="#2A3647" stroke-width="2"
                                      stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </form>
                
              </div>`;
}

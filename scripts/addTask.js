let categorys = ["Technical Task", "User Story", "Customer Support", "Bug Fix"];
let subtasks = [];
let selectedContacts = [];
let currentlyContacts = [];

/**
 * This function starts when the HTML-Body is loaded
 *
 *
 */
async function initAddTask() {
  await loadContactsData();
  renderDropdownContacts();
  changePrio("medium", "mediumSVG");
  renderCategorys();
  submitSubtaskWithEnter();
  initLoad();
  highlightNavLink("taskLink", "taskLinkResp");
  setCurrentDateInDatePicker();
}

/**
 * This function change the pirority Button
 *
 * @param {*} id = id fron the Button
 * @param {*} svg = svg from the Button
 */
function changePrio(id, svg) {
  let buttons = ["urgent", "medium", "low"];
  let svgs = ["urgentSVG", "mediumSVG", "lowSVG"];
  buttons.forEach((btn) =>
    document.getElementById(btn).classList.remove("urgent", "medium", "low")
  );
  svgs.forEach((svgId) =>
    document
      .getElementById(svgId)
      .classList.remove("urgentSVG", "mediumSVG", "lowSVG")
  );
  let button = document.getElementById(id);
  let img = document.getElementById(svg);
  if (id == "urgent") {
    button.classList.add("urgent");
    img.classList.add("urgentSVG");
  } else if (id == "medium") {
    button.classList.add("medium");
    img.classList.add("mediumSVG");
  } else {
    button.classList.add("low");
    img.classList.add("lowSVG");
  }
}

/**
 * This function read the current Prioriy
 *
 * @returns the current Priority
 */
function returnPrio() {
  let buttons = ["urgent", "medium", "low"];
  for (const btn of buttons) {
    if (document.getElementById(btn).classList.contains(btn)) {
      return btn;
    }
  }
}

/**
 *This function close the Category Dropdown
 *
 */
function toggleDropdownCategorys() {
  let dropdown = document.getElementById("categorys");
  let inputImg = document.getElementById("categorysDropdown");
  dropdown.classList.toggle("dropdown");
  if (dropdown.classList.contains("dropdown")) {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down.svg')";
  } else {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down-down.svg')";
  }
}

/**
 * This function render the Category in the dropdown menu
 *
 */
function renderCategorys() {
  let html = document.getElementById("categorys");
  html.innerHTML = "";
  for (
    let categorysIndex = 0;
    categorysIndex < categorys.length;
    categorysIndex++
  ) {
    const category = categorys[categorysIndex];
    html.innerHTML += categorysDropdownTemplate(category, categorysIndex);
  }
}

/**
 * This function put the selected Category in the Inputfield
 *
 * @param {*} categorysIndex = the index of a single Category
 */
function selectCategory(categorysIndex) {
  let categoryInput = document.getElementById("categorysDropdown");
  let category = document.getElementById(`category${categorysIndex}`).innerHTML;
  categoryInput.value = category;
  toggleDropdownCategorys();
}

/**
 * This function clears a Inputfield
 *
 * @param {*} id = id from the Inputfield
 */
function clearInput(id) {
  let input = document.getElementById(id);
  input.value = "";
  input.classList.remove("error");
  input.classList.remove("focus");
}

/**
 * This function clears the form
 */
function clearForm() {
  selectedContacts = [];
  currentlyContacts = [];
  subtasks = [];
  clearInput("title");
  clearInput("description");
  clearInput("date");
  clearInput("categorysDropdown");
  changePrio("medium", "mediumSVG");
  renderSelectedContacts();
  clearContacts();
  clearSubtasksInput();
  renderSubtasks();
}

/**
 * This function validate the InputFields
 *
 * @param {*} id = Id from the Input
 * @param {*} infoId = Id from the ValidateMeassage
 */
function validateInputFields(id, infoId) {
  let input = document.getElementById(id);
  let notice = document.getElementById(infoId);
  if (input.value.length > 0) {
    notice.classList.add("d-none");
    input.classList.add("focus");
    input.classList.remove("error");
  } else {
    notice.classList.remove("d-none");
    input.classList.add("error");
    input.classList.remove("focus");
  }
}

/**
 * This function set the border Blue from a InputField
 *
 * @param {*} id = ID from the Input
 */
function getBlueBorder(id) {
  setTimeout(() => {
    let input = document.getElementById(id);
    if (input.value.length > 0) {
      input.classList.add("focus");
    } else {
      input.classList.remove("focus");
    }
  }, 100);
}

/**
 * This function collect the Data from the entire Form
 *
 * @param {*} specificType = type from the Task e.g. "done"
 * @returns entire form as a object
 */
function collectData(specificType) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("categorysDropdown").value;
  let prio = returnPrio();
  let type = specificType;
  let data = {
    title: title,
    description: description,
    date: date,
    category: category,
    prio: prio,
    assignTo: getContactsForFB(),
    subtasks: getSubtasksForFB(),
    type: type,
  };
  return data;
}

/**
 * This function gets the right contact data
 *
 * @returns the contacts data as a object
 */
function getContactsForFB() {
  let contacts = {};
  for (let i = 0; i < selectedContacts.length; i++) {
    contacts[selectedContacts[i].firebaseid] = {
      name: selectedContacts[i].name,
      email: selectedContacts[i].email,
      phone: selectedContacts[i].phone,
      color: selectedContacts[i].color,
    };
  }
  return contacts;
}

/**
 * This function collect all Subtask and add to them a "done = false"
 *
 * @returns the subtasks as a Object
 */
function getSubtasksForFB() {
  let subtasksOBJ = {};
  for (let i = 0; i < subtasks.length; i++) {
    let singleSubtask = subtasks[i];
    subtasksOBJ[i] = {
      title: singleSubtask,
      done: false,
    };
  }
  return subtasksOBJ;
}

/**
 * This function shows a toastMeassage when a new task is created
 *
 */
function showToast() {
  let toast = document.getElementById("toastMSG");
  toast.classList.remove("animateToast");
  setTimeout(() => {
    window.location = "./board.html";
  }, 1000);
}

/**
 * This function validate the form, post the data as a object to firebase, clear the form and show the toastMeassage
 *
 * @param {*} type = type from a Task e.g. "done"
 */
async function submitForm(type) {
  let title = document.getElementById("title").value.length;
  let date = document.getElementById("date").value.length;
  let category = document.getElementById("categorysDropdown").value.length;
  let data = collectData(type);
  if (title > 0 && date > 0 && category > 0) {
    validateInputFields("title", "titleValidation");
    validateInputFields("date", "dateValidation");
    validateInputFields("categorysDropdown", "categoryValidation");
    await postData("tasks/", data);
    clearForm();
    showToast();
  } else {
    validateInputFields("title", "titleValidation");
    validateInputFields("date", "dateValidation");
    validateInputFields("categorysDropdown", "categoryValidation");
  }
}

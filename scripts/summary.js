let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * This function starts when the HTML-Body is loaded
 * 
 */
async function init() {
  initLoad();
  await getAmountofAllTasks();
  getAmountofUrgent();
  await getAmountofTask("toDo", "todo");
  await getAmountofTask("amountProgress", "inProgress");
  await getAmountofTask("feedback", "awaitFeedback");
  await getAmountofTask("done", "done");
  greeting();
  highlightNavLink("summaryLink", "summaryLinkResp");
  checkAnimationPlayed();
  window.addEventListener("resize", checkAnimation);
}

/**
 * This function count the total amount of all tasks
 * 
 */
async function getAmountofAllTasks() {
  let tasks = document.getElementById("totalTasks");
  try {
    let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
    let taskResponseAsJson = await taskResponse.json();
    let allTasks = Object.entries(taskResponseAsJson);
    tasks.innerHTML = allTasks.length;
  } catch (error) {
    console.error("Ups, u need to exercise for this stuff bra!", error);
  }
}

/**
 * This function count the total amount of tasks in a specific type
 * 
 * @param {*} id = the document id which the number of the amount gets rendered
 * @param {*} type = the type of the Task e.g. "done"
 */

async function getAmountofTask(id, type) {
  let html = document.getElementById(id);
  let count = 0;
  try {
    let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
    let taskResponseAsJson = await taskResponse.json();
    let allTasks = Object.values(taskResponseAsJson);
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      if (task.type === type) {
        count++;
      }
    }
    html.innerHTML = count;
  } catch (error) {
    console.error("Ups, u need to exercise for this stuff bra!", error);
  }
}

/**
 * This function count the amount of all tasks which have the priority of "Urgent",
 * and get the closest Urgencydate (compare with today)
 */
async function getAmountofUrgent() {
  let html = document.getElementById("urgent");
  let date = document.getElementById("deadline");
  let earliestUrgentDate = null;
  let count = 0;
  try {
    let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
    let taskResponseAsJson = await taskResponse.json();
    let allTasks = Object.values(taskResponseAsJson);
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      if (task.prio === "urgent") {
        count++;
        let currentTaskDate = new Date(task.date);
        let today = new Date();
        if (currentTaskDate >= today) {
          if (
            !earliestUrgentDate ||
            new Date(task.date) < new Date(earliestUrgentDate)
          ) {
            earliestUrgentDate = task.date;
          }
        }
      }
    }
    html.innerHTML = count;
    if (earliestUrgentDate) {
      date.innerHTML = formatDate(earliestUrgentDate);
    }
  } catch (error) {
    console.error("Ups, u need to exercise for this stuff bra!", error);
  }
}

/**
 * This function formats the date of the closeds date which gets renderd 
 * 
 * @param {This function} dateString 
 * @returns the formated date e.g. April 26, 2025
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * This function greet the user when he is logged in, greeting is depend on the daytime.
 * Also when logged in as a guest, the greeting function works the same.
 * 
 */
function greeting() {
  let guest = sessionStorage.getItem('loggedIn');
  let html = document.getElementById('greet');
  let name = sessionStorage.getItem("userName");
  let time = new Date();
  let hours = time.getHours();
  if (hours < 12) {
    if (guest === "true") {
      html.innerHTML = morningGreet(name);
    } else {
      html.innerHTML = morningGreetGuest();
    }
  } else if (hours > 12 && hours < 18) {
    if (guest === "true") {
      html.innerHTML = middayGreet(name);
    } else {
      html.innerHTML = middayGreetGuest();
    }
  } else {
    if (guest === "true") {
      html.innerHTML = eveningGreet(name);
    } else {
      html.innerHTML = eveningGreetGuest();
    }
  }
}

/**
 * This function check if the greeting animation is already played. 
 * 
 */
function checkAnimationPlayed(){
  let status = sessionStorage.getItem('animationPlayed');
  let overlay = document.getElementById('OverlayGreeting');
  let width = window.innerWidth;
  if (status === "true") {
    overlay.classList.remove('overlayAnimation');
    if (width < 850) {
    overlay.classList.add('d-none');
    }
  } else{
    playAnimation();
  }

}

/**
 * This function runs the greeting animation at the beginning.
 */
function playAnimation() {
  let overlay = document.getElementById('OverlayGreeting');
  let width = window.innerWidth;
  if (width < 850) {
    sessionStorage.setItem("animationPlayed", true);
  } else{
    overlay.classList.remove('overlayAnimation');
    sessionStorage.setItem("animationPlayed", true);
  }
}

/**
 * This function check the size of the window/screen and handle the animation between desktop and mobile. 
 * 
 */
function checkAnimation() {
  let overlay = document.getElementById('OverlayGreeting');
  let width = window.innerWidth;
  if (width < 850) {
    overlay.classList.add('d-none');
  } else {
    overlay.classList.remove('overlayAnimation');
    overlay.classList.remove('d-none');
  }
}

/**
 * This function greet the user at moring
 * @param {} name = is the username which is logged in 
 * @returns the greet and the name to render in a div
 */
function morningGreet(name) {
  return `
    <p>Good morning,</p>
    <span>${name}</span>
  `;
}

/**
 * This function greet the guest at moring
 * @returns the greet and the name to render in a div
 */
function morningGreetGuest() {
  return `
    <p>Good morning!</p>
  `;
}

/**
 * This function greet the user at midday
 * @param {} name = is the username which is logged in 
 * @returns 
 */
function middayGreet(name) {
  return `
    <p>Good afternoon,</p>
    <span>${name}</span>
  `;
}

/**
 * This function greet the guest at midday
 * @returns the greet and the name to render in a div
 */
function middayGreetGuest() {
  return `
    <p>Good afternoon!</p>
  `;
}

/**
 * This function greet the user at the evening
 * @param {} name = is the username which is logged in 
 * @returns 
 */
function eveningGreet(name) {
  return `
    <p>Good evening,</p>
    <span>${name}</span>
  `;
}

/**
 * This function greet the guest at the evening
 * @returns the greet and the name to render in a div
 */
function eveningGreetGuest() {
  return `
    <p>Good evening!</p>
  `;
}
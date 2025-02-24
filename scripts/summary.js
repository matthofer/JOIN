let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

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
  // playAnimation();
  checkAnimationPlayed();
  window.addEventListener("resize", checkAnimation);
}

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


function morningGreet(name) {
  return `
    <p>Good morning,</p>
    <span>${name}</span>
  `;
}

function morningGreetGuest() {
  return `
    <p>Good morning!</p>
  `;
}

function middayGreet(name) {
  return `
    <p>Good afternoon,</p>
    <span>${name}</span>
  `;
}

function middayGreetGuest() {
  return `
    <p>Good afternoon!</p>
  `;
}

function eveningGreet(name) {
  return `
    <p>Good evening,</p>
    <span>${name}</span>
  `;
}

function eveningGreetGuest() {
  return `
    <p>Good evening!</p>
  `;
}

function checkAnimationPlayed(){
  let status = sessionStorage.getItem('animationPlayed');
  let overlay = document.getElementById('OverlayGreeting');
  if (status === "true") {
    overlay.classList.remove('overlayAnimation');
    overlay.classList.add('d-none');

  } else{
    playAnimation();
  }

}

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
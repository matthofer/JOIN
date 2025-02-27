/**
 *
 * This function open a new Page by click on the Div
 * @param {*} htmlFileName = filepath which gets open e.g. "login.html"
 */
function openPage(htmlFileName) {
  window.location = htmlFileName;
}

/**
 * This function gets the Userinitials and put them in the Header
 *
 */
function initLoad() {
  let userInitials = sessionStorage.getItem("userInitials");
  if (userInitials) {
    document.getElementById("userInitials").innerHTML = userInitials;
  } else {
    document.getElementById("userInitials").innerHTML = "G";
  }
}

/**
 * This function highlight the current page at the sidebar or mobilefooter
 *
 * @param {*} idDesktop
 * @param {*} idMobile
 */
function highlightNavLink(idDesktop, idMobile) {
  document.getElementById(idDesktop).classList.add("markedLink");
  document.getElementById(idMobile).classList.add("markedLink");
}

/**
 * This function toggle the BurgerMenu at the Header
 *
 */
function toggleBurgerMenu() {
  let btn = document.getElementById("burgerMenu");
  btn.classList.toggle("slideBurgerMenu");
}

/**
 * This function log the user out and clears the sessionstorage
 *
 */
function logOut() {
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userInitials");
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("animationPlayed");
}

/**
 * This function closes the BurgerMenu even when clicking outside from the menu
 *
 * @returns nothing just stop the function when the burgermenu is not open
 */
function closeBurgerMenu() {
  let openMenu = document.getElementById("burgerMenu");
  if (!openMenu.classList.contains("slideBurgerMenu")) {
    toggleBurgerMenu();
  } else {
    return;
  }
}

/**
 * This function returns the current date in YYYY-MM-DD format
 *
 */
function getCurrentDate() {
  let date = new Date();
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  let year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

function setCurrentDateInDatePicker() {
  const currentDate = getCurrentDate();
  document.getElementById("date").min = currentDate;
}

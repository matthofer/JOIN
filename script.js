function openPage(htmlFileName) {
  window.location = htmlFileName;
}

function initLoad() {
  let userInitials = sessionStorage.getItem("userInitials");
  if (userInitials) {
    document.getElementById("userInitials").innerHTML = userInitials;
  } else {
    document.getElementById("userInitials").innerHTML = "G";
  }
}

function highlightNavLink(idDesktop, idMobile) {
  document.getElementById(idDesktop).style.backgroundColor = "#091931";
  document.getElementById(idMobile).style.backgroundColor = "#091931";
}


function toggleBurgerMenu(){
  let btn = document.getElementById('burgerMenu');
  btn.classList.toggle('slideBurgerMenu');
}

function logOut(){
  sessionStorage.removeItem('userName')
  sessionStorage.removeItem('userInitials')
  sessionStorage.removeItem('loggedIn')
  sessionStorage.removeItem('animationPlayed')
}

function closeBurgerMenu(){
  let openMenu = document.getElementById('burgerMenu');
  if (!openMenu.classList.contains('slideBurgerMenu')) {
    toggleBurgerMenu()
  }
  else{
    return
  }
}
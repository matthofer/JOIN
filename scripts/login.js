let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

async function loginUser(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    let response = await fetch(FB_URL + "/users.json");

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Benutzerdaten.");
    }

    let users = await response.json();
    let loggedInUser = null;

    for (let userId in users) {
      let user = users[userId];
      if (user.email === email && user.password === password) {
        loggedInUser = user;
        break;
      }
    }

    if (loggedInUser) {
      let initials = getInitials(loggedInUser.name);
      sessionStorage.setItem("userInitials", initials);
      window.location.href = "summary.html";
      document.getElementById("email").value = "";
    } else {
      alert("Login fehlgeschlagen. Überprüfe deine E-Mail und dein Passwort.");
    }
  } catch (error) {
    console.error("Fehler beim Login:", error);
    alert("Es gab ein Problem beim Login. Bitte versuche es später erneut.");
  }
}

function getInitials(name) {
  let nameParts = name.split(" ");
  let initials = nameParts
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

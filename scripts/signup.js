const checkbox = document.getElementById("customCheckbox");
const uncheckedIcon = document.querySelector(".unchecked");
const checkedIcon = document.querySelector(".checked");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    uncheckedIcon.style.display = "none";
    checkedIcon.style.display = "inline-block";
  } else {
    checkedIcon.style.display = "none";
    uncheckedIcon.style.display = "inline-block";
  }
});

let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

async function createUser(name, email, password) {
  try {
    let user = {
      name: name,
      email: email,
      password: password,
    };

    let response = await fetch(FB_URL + "/users.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("User created successfully!");
      return true;
    } else {
      console.error("Failed to create user.");
      return false;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

async function handleSignup(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let success = await createUser(name, email, password);

  if (success) {
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  } else {
    alert("Signup failed. Please try again.");
  }
}

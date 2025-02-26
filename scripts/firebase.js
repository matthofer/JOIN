/**
 * This function creates a new in firebase to a specific path
 *
 * @param {string} path - This the path to the object in firebase for example "users/"
 * @param {string} data - this is the object for example { id: newID, username: newUsername }
 */

async function postData(path, data = {}) {
  try {
    await fetch(FB_URL + path + ".json", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    document.getElementById("headerMsg").innerHTML =
      getFirebaseErrorMsgTemplate(
        error,
        "Error during inserting data in firebase. Please repeat or try again later"
      );
  }
}

/**
 * This function updates a specific object in firebase
 *
 * @param {string} path - This the path to the object in firebase for example (path = `users/${users[i].firebaseid}`),
 * @param {string} data - this is the object for example data = { id: editedId, username: editedUsername }
 */

async function putData(path, data = {}) {
  try {
    await fetch(FB_URL + path + ".json", {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    document.getElementById("headerMsg").innerHTML =
      getFirebaseErrorMsgTemplate(
        error,
        "Error during updating data in firebase. Please repeat or try again later"
      );
  }
}

/**
 * This function deletes a specific entrie in firebase
 *
 * @param {string} path - This the path to a specific object in firebase for example `/users/${users[i].firebaseid}`
 */
async function deleteData(path) {
  try {
    let response = await fetch(FB_URL + path + ".json", {
      method: "DELETE",
    });
    return (responseToJson = await response.json());
  } catch (error) {
    document.getElementById("headerMsg").innerHTML =
      getFirebaseErrorMsgTemplate(
        error,
        "Error during deletion of data in firebase. Please repeat or try again later"
      );
  }
}

function getFirebaseErrorMsgTemplate(error, msg) {
  return `"<p style='color: red'>${error}: ${msg}</p>";`;
}

/**
 * This function creates a new in firebase to a specific path
 *
 * @param {string} path - This the path to the object in firebase for example "users/"
 * @param {string} data - this is the object for example { id: newID, username: newUsername }
 */

async function postData(path, data = {}) {
  await fetch(FB_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * This function deletes a specific entrie in firebase
 *
 * @param {string} path - This the path to a specific object in firebase for example `/users/${users[i].firebaseid}`
 */
async function deleteData(path) {
  let response = await fetch(URL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

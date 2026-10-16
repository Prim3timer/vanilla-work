import myUrl from "./myUrl.js";
import { mainSettings } from "./userSettings.js";
import {addExercisePage} from "./addExercise.js";
import { ElementCatcher } from "./genFunc.js";

const usersettingsPage = mainSettings();
console.log(mainSettings());

const pages = [addExercisePage()];

const mainContainer = document.getElementById("main-page");
const instanceer = new ElementCatcher(pages, mainContainer, localStorage.getItem("workoutUserId"));

const userBox = document.createElement("div");
userBox.className = "users";
const usersHeader = document.createElement("h3");
// usersHeader.innerHTML = "users";
usersHeader.className = "users-header"
const entryCount = document.createElement("h3");
  const filterForm = document.createElement("form")
  filterForm.className = "filter-form"
  const usersFilter = document.createElement("input")
  const filterButton = document.createElement("span")
  const addExerciseButton = document.createElement("button")
addExerciseButton.addEventListener("click", instanceer.shower)
addExerciseButton.id = "add-exercise"
addExerciseButton.innerHTML = "add exercise"
filterButton.className = "filter-button"
filterButton.innerHTML = "filter"
usersFilter.className = "users-filter"
filterForm.append(addExerciseButton, usersFilter, filterButton)
userBox.append(filterForm, usersHeader, entryCount);
const table = document.createElement("table");
const tableBody = document.createElement("tbody");
const headerRow = document.createElement("tr");

const containers = [mainSettings()];

const userSettingsId = localStorage.getItem("userSettingsId")

const getUsers = async () => {
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  
  });
  const users = await response.json()
  return users


}

const users = await getUsers();


usersFilter.addEventListener("input", (e) => {
  const filterate = users.filter((user) => user.username.includes(e.target.value))
  console.log(filterate)
  entryCount.innerHTML = `(${filterate.length})`
    for (let i = 0; i < filterate.length; i++) {
    const usersList = document.createElement("tr");
    usersList.style.backgroundColor = `${i % 2 === 0 ? "white" : "palegreen"}`;
    const nameElement = document.createElement("td");
    const joined = document.createElement("td");
    const rolesElement = document.createElement("td");
    const settingsElement = document.createElement("td");
    const settingsAnchor = document.createElement("a");
    
    const instanceer = new ElementCatcher(containers, mainContainer, filterate[i]._id);
    settingsElement.addEventListener("click", () => {
      localStorage.setItem("userSettingsId", filterate[i]._id);
      localStorage.setItem("user", JSON.stringify(filterate[i]))
    });
    settingsElement.appendChild(settingsAnchor);
    for (let j = 0; j < 4; j++) {
      nameElement.innerHTML = filterate[i].username;
      rolesElement.innerHTML = Object.keys(filterate[i].roles).join(", ");
      joined.innerHTML = new Date(filterate[i].joined).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }
    settingsAnchor.innerHTML = "usersettings";
    settingsAnchor.id = "usersettings";
    settingsAnchor.addEventListener("click", instanceer.shower);
    usersList.append(nameElement, rolesElement, joined, settingsElement);
    for (let j = 0; j <= users.length; j++){
      // console.log(table.children[j])
      table.children[i]?.remove()
    }
      table.append(headerRow, usersList)
  }
  // users = filterate
})
const usersPage = () => {
  entryCount.innerHTML = `(${users.length})`;

  const nameHeader = document.createElement("th");
  const emailHeader = document.createElement("th");
  const joinedHeader = document.createElement("th");
  const settingsHeader = document.createElement("th");
  nameHeader.innerHTML = "name";
  emailHeader.innerHTML = "roles";
  joinedHeader.innerHTML = "joined";
  settingsHeader.innerHTML = "settings";
  headerRow.append(nameHeader, emailHeader, joinedHeader, settingsHeader);
  tableBody.appendChild( headerRow);
  table.appendChild(tableBody);
  userBox.appendChild(table);
  
  
  for (let i = 0; i < users.length; i++) {
    const usersList = document.createElement("tr");
    usersList.style.backgroundColor = `${i % 2 === 0 ? "white" : "palegreen"}`;
    const nameElement = document.createElement("td");
    const joined = document.createElement("td");
    const rolesElement = document.createElement("td");
    const settingsElement = document.createElement("td");
    const settingsAnchor = document.createElement("a");
    
    const instanceer = new ElementCatcher(containers, mainContainer, users[i]._id);
    settingsElement.addEventListener("click", () => {
      localStorage.setItem("userSettingsId", users[i]._id);
      localStorage.setItem("user", JSON.stringify(users[i]))
    });
    settingsElement.appendChild(settingsAnchor);
    for (let j = 0; j < 4; j++) {
      nameElement.innerHTML = users[i].username;
      rolesElement.innerHTML = Object.keys(users[i].roles).join(", ");
      joined.innerHTML = new Date(users[i].joined).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      // joined.innerHTML = users[i]._id;
    }
    settingsAnchor.innerHTML = "usersettings";
    settingsAnchor.id = "usersettings";
    settingsAnchor.addEventListener("click", instanceer.shower);
    usersList.append(nameElement, rolesElement, joined, settingsElement);
    table.append(usersList);
  }
  return userBox;
};

// getUsers();

export { usersPage };

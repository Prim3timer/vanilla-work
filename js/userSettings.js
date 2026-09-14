import myUrl from "./myUrl.js";
import { usersPage } from "./users.js";

const mainContainer = document.getElementById("main-page");
const userSettingsMain = document.createElement("div");
userSettingsMain.className = "usersettings";
const userSettingsHeader = document.createElement("h3");
userSettingsHeader.innerHTML = "user settings";
userSettingsMain.appendChild(userSettingsHeader);
const userSettingsForm = document.createElement("form");
userSettingsForm.className = "user-setting-form";
const usernameLable = document.createElement("label");
usernameLable.innerHTML = "username:";
const activeLabel = document.createElement("label");
activeLabel.className = "verified-label";
activeLabel.innerHTML = "active:";
const selectCont = document.createElement("div");
selectCont.className = "assinged-roles-cont";
const userNameInput = document.createElement("input");
userNameInput.className = "user-setting-name";
const activeInput = document.createElement("input");
activeInput.className = "user-setting-verified";
const selectLabel = document.createElement("label");
selectLabel.innerHTML = "assinged roles:";
const selectElement = document.createElement("select");
selectElement.name = "roles";
selectElement.size = 3;
selectElement.multiple = true;
selectElement.className = "roles-select";
// selectElement.value = "roles";
selectCont.append(selectLabel);

const user = JSON.parse(localStorage.getItem("user"))
console.log(user)
// userNameInput.value = user.username

// these are the breaks
const usernameBreak = document.createElement("br");
const activeBreak = document.createElement("br");
const selectBreak = document.createElement("br");
const formBreak = document.createElement("br");

activeInput.className = "user-setting-verified";
activeInput.type = "checkbox";
usernameLable.append(usernameBreak, userNameInput);
activeLabel.append(activeInput);
selectLabel.append(selectBreak, selectElement);
userSettingsForm.append(usernameLable, activeBreak, activeLabel, selectCont);

const buttonsContainer = document.createElement("article");
buttonsContainer.className = "user-setting-buttons";

const saver = document.createElement("button");
saver.innerHTML = `<i class="fa-solid fa-save"></i>`;
saver.className = "user-setting-saver";
const deleter = document.createElement("button");
deleter.innerHTML = `<i class="fa-solid fa-trash"></i></i>`;
deleter.className = "user-setting-delete";
buttonsContainer.append(saver, deleter);



const ROLES = {
  User: 2001,
  Manager: 1984,
  Admin: 5150,
};

let userRoles = [];

const rolesArray = Object.keys(ROLES);
const optons = rolesArray.map((role) => {
  const roleOption = document.createElement("option");
  roleOption.className = "role-option";
  roleOption.innerHTML = role;
  return roleOption;
});
selectElement.append(optons[0], optons[1], optons[2]);
const optionsArray = []
selectElement.addEventListener("change", () => {
  const allSelectedValues = Array.from(selectElement.selectedOptions).map(optons => optons.value)
  console.log(allSelectedValues)
  // optionsArray = allSelectedValues
const storedRoles = localStorage.setItem("all-select-values", JSON.stringify(allSelectedValues))
console.log(storedRoles)
})

const sendUpdate = async () => {
  const storedRoles = JSON.parse(localStorage.getItem("all-select-values"))
  const activeChecked = localStorage.getItem("is-active-input-checked")
  const updatesItems = {
    storedRoles,
    activeChecked

  }
  console.log(user._id)
  const response = await fetch(`${myUrl}/user-setting/${user._id}`, {
    method: "PATCH",
    headers: {
      "Content/Type": "application/json"
    },
    body: JSON.stringify(updatesItems)
  })
}

saver.addEventListener("click", sendUpdate)

activeInput.addEventListener("change", () => {
  // if (activeInput.checked){
  //   activeInput.checked
  // } else activeInput.checked
  console.log(activeInput.checked)
  localStorage.setItem("is-active-input-checked", activeInput.checked )
})

let verifyWindow = document.createElement("div");
verifyWindow.className = "no-verify-window";
verifyWindow.style.padding = ".5rem";
verifyWindow.style.display = "flex";
verifyWindow.style.flexDirection = "column";
verifyWindow.style.rowGap = "1rem";
verifyWindow.style.alignItems = "center";
verifyWindow.style.backgroundColor = "lavender";
verifyWindow.style.position = "fixed";
verifyWindow.style.top = "40%";

let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this user?";

let verifyWindowButtonCont = document.createElement("article");
// verifyWindow.append(verifyWindowButtonCont);
let itemId = "";
// verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = "Yes";
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

userSettingsMain.appendChild(verifyWindow);
const removeVerifier = () => {
  verifyWindow.className = "verify-window";
  verifyWindowButtonCont.className = "verify-button-cont";
};

noButton.addEventListener("click", () => {
  verifyWindow.className = "no-verify-window";
});



deleter.addEventListener("click", removeVerifier);



yesButton.addEventListener("click", async (e) => {
  // e.preventDefault();
  verifyWindow.className = "no-verify-window";  
;
  localStorage.setItem("current-page", "users")
  try {
    const userId = localStorage.getItem("userSettingsId");
    if (userId){
        usersPage().innerHTML = ""
        userSettingsMain.remove()
  mainContainer.append(usersPage())
      console.log(userId)
      const response = await fetch(`${myUrl}/workout-users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // window.location.reload()
      const result = await response.json();
      if (result) {
        
      }
      console.log(result);
    } 
    
  }
  catch (error) {
    console.log(error);
  }
});

userSettingsMain.append(userSettingsForm, formBreak, buttonsContainer);
const mainSettings = (id) => {
  return userSettingsMain;
};

export { mainSettings };

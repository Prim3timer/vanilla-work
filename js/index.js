import { homePage } from "./home.js";
import { getData, performancePage } from "./performance.js";
import { settingsPage, populate } from "./settings.js";
import { usersPage } from "./users.js";
import { ElementCatcher, getSpecificPage, populateUserSettings } from "./genFunc.js";
import { register } from "./register.js";
import myUrl from "./myUrl.js";
import { forgotPage } from "./forgotPassword.js";
import { loginPage } from "./login.js";
import { mainSettings } from "./userSettings.js";

console.log(loginPage())
const greeting = document.getElementsByClassName("greeting")[0];
greeting.style.position = "fixed";
greeting.style.padding = ".5rem";
greeting.style.borderRadius = "5px";

const motherShip = document.getElementById("root")
const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];
 const replyElement = document.createElement("h4");

     const navFirst = document.getElementsByClassName("title-element")[0];
  navFirst.innerHTML = "Aerobics Guide";
  // navFirst.className = "title-element"


  const alertMessage = document.createElement("h4")


console.log(navbar);

const homeLInk = document.getElementById("home");
homeLInk.innerHTML = "home";
homeLInk.id = "home";
// homeLInk.className = "home"

const perfLInk = document.getElementById("performance");
perfLInk.innerHTML = "performance";
perfLInk.id = "performance";

const settingsLInk = document.getElementById("settings");
settingsLInk.innerHTML = "settings";
settingsLInk.id = "settings";

const usersLInk = document.getElementById("users");
usersLInk.innerHTML = "users";
usersLInk.id = "users";

const logoutLInk = document.getElementById("logout");
logoutLInk.innerHTML = "logout";
logoutLInk.id = "logout";





const submitButton = loginPage().getElementsByClassName("sign-up-anchor")[0];

const verifyUrl = document.location.search;
const guestId = localStorage.getItem("workoutUserId");
// const loginPage = document.getElementsByClassName("login")[0];

  const url = window.location.href
const urlParamsPrompt = new URLSearchParams(url)
const message = urlParamsPrompt.get("prompt") || ""

console.log(greeting);
const urlParams = new URLSearchParams(verifyUrl);
const email = urlParams.get("email");
const issuedTime = urlParams.get("elapsed");
console.log(email, issuedTime);
// console.log(forgotPage());

const usernameInput = loginPage().querySelector("#username");
const passwordInput = loginPage().querySelector("#password");
console.log(usernameInput.value, passwordInput.value)

const containers = [
  homePage(),
  performancePage(),
  settingsPage(),
  usersPage(),
  register(),
  forgotPage(),
  mainSettings()
];



const instanceer = new ElementCatcher(containers, mainContainer, guestId);

const handleRefresh = async () => {
  // navbar.innerHTML = ""
  console.log(document); 
  const currentPageInnerText = localStorage.getItem("current-page") || "home"
  const getCurrentPage = containers.find( (page) =>  page.className === currentPageInnerText)
  console.log(currentPageInnerText)
  if (guestId) {
    // repopulate the exercise setup form fields
    for (let i = 1; i < navbar.children.length; i++){
  navbar.children[i].style.display = "inline"
}
navFirst.style.display = "none"
    populate(guestId)
  console.log(guestId)
  console.log(currentPageInnerText)
  console.log(getCurrentPage)
  // navbar.replaceChildren();
  // reassign the eventlistener to the pages.
  homeLInk.addEventListener("click", instanceer.shower)
  perfLInk.addEventListener("click", instanceer.shower)
  settingsLInk.addEventListener("click", instanceer.shower)
   usersLInk.addEventListener("click", instanceer.shower)
  //  navbar.append(homeLInk, perfLInk, settingsLInk, usersLInk, logoutLInk);

   
   console.log(getCurrentPage)
   const user = JSON.parse(localStorage.getItem("user"));
   if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId") !== null) {
     const usernameElement = mainSettings().getElementsByClassName("user-setting-name")[0]
     usernameElement.innerHTML = user.username
     
      mainContainer.firstElementChild.replaceWith(getCurrentPage);
      return;
    } else {
      console.log(getCurrentPage)
      mainContainer.appendChild(getCurrentPage);
      return;
    }
  } else {
     // insert the business name in the navbar
  // navbar.replaceChildren();
  // navbar.appendChild(navFirst);
  navFirst.style.display = "block"
  for (let i = 1; i < navbar.children.length; i++){
  navbar.children[i].style.display = "none"
}
    if (mainContainer.children.length > 0) {
      mainContainer.firstElementChild.replaceWith(loginPage());
    } else {
      mainContainer.appendChild(loginPage());
    }
  }
};

handleRefresh();
console.log(submitButton);

const resetMessage  = loginPage().getElementsByClassName("reset-message")[0]
const login = async (e) => {
  e.preventDefault();
  const firstExercise = settingsPage().getElementsByTagName("input")[0]
  console.log(firstExercise)
  resetMessage.innerHTML = "processing..."
  const cred = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  console.log(cred);
  try {
    const response = await fetch(`${myUrl}/workout-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
  
    const reply = await response.json();
    console.log(reply)
    console.log(reply);
    if (reply.verified === false){
      resetMessage.innerHTML = "unverified. Open the email sent to you from Uthokoii or reset your password"
      resetMessage.style.color = "red"
    }
    else if (reply.id) {
      greeting.innerHTML = `hi, ${reply.name}`;
         navFirst.style.display = "none"
         const instanceerInner = new ElementCatcher(containers, mainContainer, reply.id);
         getData(reply.id)
    for (let i = 1; i < navbar.children.length; i++){
      navbar.children[i].style.display = "inline"
      navbar.children[i].addEventListener("click", instanceerInner.shower)
    }
        const url = new URL(window.location.href)
  url.searchParams.delete("email")
  url.searchParams.delete("prompt")
  url.searchParams.delete("elapsed")
  localStorage.setItem("workoutUserId", reply.id);
  if (mainContainer.children.length > 0) {
    console.log(mainContainer.firstElementChild)
    mainContainer.firstElementChild.replaceWith(homePage(reply.id));
    // populate the exercise setup fields
    populate(reply.id)
    const tbody = performancePage().getElementsByClassName("performance-tbody")[0]
    // clear the performance table.
    tbody.innerHTML = ""
    // add headers row to the tbody
    const testElement = document.createElement("h3")
   const headerRow = document.createElement("tr");
const dHeader = document.createElement("th");
const rHeader = document.createElement("th");
const exHeader = document.createElement("th");
const exDetsHeader = document.createElement("th");
const markHeader = document.createElement("th");
const dateHeader = document.createElement("th");
const deleteHeader = document.createElement("th");
// const delet = document.createElement("th");

dHeader.innerHTML = "duraton";
rHeader.innerHTML = "rounds completed";
exHeader.innerHTML = "overall effort (%)";
exDetsHeader.innerHTML = "exercises per round";
// markHeader.innerHTML = "mark (%)";
dateHeader.innerHTML = "date";
// tableBody.appendChild(headerRow);
headerRow.append(
  dHeader,
  rHeader,
  exHeader,
  exDetsHeader,
  // markHeader,
  dateHeader,
  deleteHeader,
);
tbody.appendChild(headerRow)
    // repopulate the performance table.
 
    // performancePage().addEventListener("click", instanceer.shower);
    localStorage.setItem("roles", JSON.stringify(reply.roles))
    

   // remove the email parameter from the url
   const url = new URL(window.location.href)
   url.searchParams.delete("email")
   url.searchParams.delete("prompt")
   url.searchParams.delete("elapsed")
 

  window.history.replaceState({}, document.title, url.toString())
        return;
      } else {
        mainContainer.appendChild(homePage());  
        return;
      }
    } else {
      const errorMessage = true 
       mainContainer.firstElementChild.replaceWith(loginPage(reply.message, errorMessage));
    }
  } catch (error) {
    console.log(error);
  }
  finally {
  }
};






submitButton.addEventListener("click", login);



const getVerified = async () => {
  
  try {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    greeting.innerHTML = guestId
      ? `Hi, ${users.find((user) => user._id === guestId).username}`
      : "";

      
     
        replyElement.style.color = "black";
        replyElement.style.padding = ".5rem";
        // replyElement.style.position = "fixed";
        replyElement.style.borderRadius = "5px";
        // replyElement.style.top = "5rem";
        // replyElement.style.justifySelf = "center"
      motherShip.insertBefore(replyElement, mainContainer)

      if (email && message) {
      console.log(message)
      replyElement.innerHTML = message
    }
    else if (email ) {
      const foundUser = users.find((user) => user.email === email);
      if (foundUser) {
        const updateUser = await fetch(
          `${myUrl}/workout-users/verification/${foundUser._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }, 
        );
      
console.log(message)

        const reply = await updateUser.json();
        replyElement.className = "reply";
        // replyElement.style.backgroundColor = "gainsboro";
      
        replyElement.innerHTML = `<i class="fa-solid fa-check" style="color: white;
        font-size: 1.5rem;
        background-color: green;
        padding: .2rem;
        border-radius: 5px;
        font-weight: bold;"></i> ${reply}`;
        motherShip.insertBefore(replyElement, mainContainer)
        console.log(reply);
      }
    } 
  } catch (error) {
    console.log(error);
  }
  // localStorage.setItem("currentPage", )
};

getVerified();




console.log(forgotPage())
const regLink = loginPage().getElementsByClassName("reg-link")[0];
const forgotMain = loginPage().getElementsByClassName("forgot-password")[0]
console.log(forgotMain)
console.log(regLink)



  regLink?.addEventListener("click", (e) => getSpecificPage(e, register, mainContainer));
  forgotMain?.addEventListener("click", (e) => getSpecificPage(e, forgotPage, mainContainer));



const getToHomePage = (e) => {
  e.preventDefault();
     navFirst.style.display = "block"
    for (let i = 1; i < navbar.children.length; i++){
      navbar.children[i].style.display = "none"
    }
  localStorage.removeItem("userSettingsId");
  if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId")) {
  mainContainer.firstElementChild.replaceWith(loginPage());
  localStorage.removeItem("workoutUserId");
  localStorage.removeItem("current-page");
  greeting.innerHTML = "";

  // navbar.appendChild(navFirst);
  } else mainContainer.appendChild(loginPage())
};
logoutLInk.addEventListener("click", getToHomePage);

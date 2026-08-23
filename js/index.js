import { homePage } from "./home.js";
import { performancePage } from "./performance.js";
import { settingsPage } from "./settings.js";
import { usersPage } from "./users.js";
import { ElementCatcher } from "./genFunc.js";
import { register } from "./register.js";
import myUrl from "./myUrl.js";
import { forgotPage } from "./forgotPassword.js";
import { loginPage } from "./login.js";

console.log(loginPage())
const greeting = document.getElementsByClassName("greeting")[0];
greeting.style.position = "fixed";
greeting.style.padding = ".5rem";
greeting.style.borderRadius = "5px";

const motherShip = document.getElementById("root")
const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];

     const navFirst = document.createElement("h4");
  navFirst.innerHTML = "Aerobics Lab";
  navFirst.style.color = "white";
  navFirst.style.fontSize = "1.5rem";

console.log(navbar);

const homeLInk = document.createElement("a");
homeLInk.innerHTML = "home";
homeLInk.id = "home";

const perfLInk = document.createElement("a");
perfLInk.innerHTML = "performance";
perfLInk.id = "about";

const settingsLInk = document.createElement("a");
settingsLInk.innerHTML = "settings";
settingsLInk.id = "settings";

const usersLInk = document.createElement("a");
usersLInk.innerHTML = "users";
usersLInk.id = "users";

const logoutLInk = document.createElement("a");
logoutLInk.innerHTML = "logout";
logoutLInk.id = "logout";



const submitButton = loginPage().getElementsByClassName("sign-up-anchor")[0];

const verifyUrl = document.location.search;
const guestId = localStorage.getItem("workoutUserId");
// const loginPage = document.getElementsByClassName("login")[0];
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
];

const instanceer = new ElementCatcher(containers, mainContainer, guestId);

const handleRefresh = async (e) => {
 console.log(document); 

 const currentPage = localStorage.getItem("current-page")
 const getCurrentPage = containers.find((page) => page.firstElementChild.innerHTML === currentPage)
 console.log(currentPage)
 if (guestId) {
   navbar.replaceChildren();
  // reassign the eventlistener to the pages.
    homeLInk.addEventListener("click", instanceer.shower)
   perfLInk.addEventListener("click", instanceer.shower)
   settingsLInk.addEventListener("click", instanceer.shower)
   usersLInk.addEventListener("click", instanceer.shower)
  navbar.append(homeLInk, perfLInk, settingsLInk, usersLInk, logoutLInk);

  console.log(getCurrentPage)
    if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId") !== null) {

      mainContainer.firstElementChild.replaceWith(getCurrentPage);
      return;
    } else {
      mainContainer.appendChild(getCurrentPage);
      return;
    }
  } else {
     // insert the business name in the navbar
  navbar.replaceChildren();
  navbar.appendChild(navFirst);
    if (mainContainer.children.length > 0) {
      mainContainer.firstElementChild.replaceWith(loginPage());
    } else {
      mainContainer.appendChild(loginPage());
    }
  }
};

handleRefresh();
console.log(submitButton);


const login = async (e) => {
  e.preventDefault();
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
    console.log(reply.id);
    if (reply.id) {
      localStorage.setItem("workoutUserId", reply.id);
      if (mainContainer.children.length > 0) {
        mainContainer.firstElementChild.replaceWith(homePage());
        performancePage().addEventListener("click", instanceer.shower);
        greeting.innerHTML = `hi, ${reply.name}`;
        
        const instanceerInner = new ElementCatcher(containers, mainContainer, reply.id);
        // insert the nav links into the navbar
   navbar.replaceChildren();
   homeLInk.addEventListener("click", instanceerInner.shower)
   perfLInk.addEventListener("click", instanceerInner.shower)
   settingsLInk.addEventListener("click", instanceerInner.shower)
   usersLInk.addEventListener("click", instanceerInner.shower)
  
  navbar.append(homeLInk, perfLInk, settingsLInk, usersLInk, logoutLInk);
        return;
      } else {
        mainContainer.appendChild(homePage());
        return;
      }
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
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
    if (email) {
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

        const reply = await updateUser.json();
        const replyElement = document.createElement("h4");
        replyElement.className = "reply";
        // replyElement.style.backgroundColor = "gainsboro";
        replyElement.style.color = "black";
        replyElement.style.padding = ".5rem";
        replyElement.style.position = "fixed";
        replyElement.style.borderRadius = "5px";
        replyElement.style.top = "5rem";
        replyElement.style.justifySelf = "center"
        replyElement.innerHTML = `<i class="fa-solid fa-check" style="color: green;
        font-size: 1.5rem;
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




const webpages = navbar.children;
console.log(navbar.children);
const regLink = loginPage().getElementsByClassName("reg-link")[0];
const forgotMain = loginPage().getElementsByClassName("forgot-password")[0]

  // webpages[0].addEventListener("click", instanceer.shower);
  // webpages[1]?.addEventListener("click", instanceer.shower);
  // webpages[2]?.addEventListener("click", instanceer.shower);
  // webpages[3]?.addEventListener("click", instanceer.shower);
  // webpages[5].addEventListener("click", instanceer.shower);
  regLink?.addEventListener("click", instanceer.shower);
  forgotMain?.addEventListener("click", instanceer.shower);



const getToHomePage = (e) => {
  e.preventDefault();
  localStorage.removeItem("userSettingsId");
  if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId")) {
  mainContainer.firstElementChild.replaceWith(loginPage());
  localStorage.removeItem("workoutUserId");
  localStorage.removeItem("current-page");
  greeting.innerHTML = "";
  navbar.replaceChildren();
  navbar.appendChild(navFirst);
  } else mainContainer.appendChild(loginPage())
};
logoutLInk.addEventListener("click", getToHomePage);

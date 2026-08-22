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
greeting.style.backgroundColor = "gainsboro";
greeting.style.padding = ".5rem";
greeting.style.borderRadius = "5px";
const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];

const submitButton = loginPage().getElementsByClassName("sign-up-anchor")[0];

// console.log(loginPages())

// mainContainer.appendChild(greeting)

// navbar dynamic children
const homeLInk = document.createElement("a");
homeLInk.innerHTML = "home";
homeLInk.id = "home";
homeLInk.className = "nav-link";
console.log(homeLInk);
const perfLInk = document.createElement("a");
perfLInk.innerHTML = "performance";
perfLInk.id = "about";
const settinsLInk = document.createElement("a");
settinsLInk.innerHTML = "settings";
settinsLInk.id = "settings";
const usersLInk = document.createElement("a");
usersLInk.innerHTML = "users";
usersLInk.id = "users";
const logoutLInk = document.createElement("a");
logoutLInk.innerHTML = "logout";
logoutLInk.id = "logout";
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

const handleRefresh = async (e) => {
  if (guestId) {
    // navbar.replaceChildren();
    // navbar.children.className = "no-verify-window";
    // navbar.append(homeLInk, perfLInk, settinsLInk, usersLInk, logoutLInk);
    // mainContainer.insertBefore(navbar);
    // console.log(mainContainer);

    if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId") !== null) {
      mainContainer.firstElementChild.replaceWith(homePage());
      return;
    } else {
      mainContainer.appendChild(homePage());
      return;
    }
  } else {
    if (mainContainer.children.length > 0) {
      // greeting.innerHTML = `hi, ${reply.name}`;
      mainContainer.firstElementChild.replaceWith(loginPage());
      return;
    } else {
      mainContainer.appendChild(loginPage());
      return;
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
        greeting.innerHTML = `hi, ${reply.name}`;
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

const containers = [
  homePage(),
  performancePage(),
  settingsPage(),
  usersPage(),
  register(),
  forgotPage(),
];

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
        const replyElement = document.getElementsByClassName("no-reply")[0];
        replyElement.className = "reply";
        replyElement.style.backgroundColor = "gainsboro";
        replyElement.style.padding = ".5rem";
        replyElement.style.borderRadius = "5px";
        replyElement.innerHTML = reply;
        console.log(reply);
      }
    }
  } catch (error) {
    console.log(error);
  }
  // localStorage.setItem("currentPage", )
};

getVerified();



const instanceer = new ElementCatcher(containers, mainContainer, guestId);

const webpages = navbar.children;
console.log(navbar.children);
const regLink = document.getElementsByClassName("reg-link")[0];
const forgotMain = document.getElementsByClassName("forgot-password")[0];
console.log(forgotMain);

webpages[0].addEventListener("click", instanceer.shower);
webpages[1].addEventListener("click", instanceer.shower);
webpages[2].addEventListener("click", instanceer.shower);
webpages[3].addEventListener("click", instanceer.shower);
// webpages[5].addEventListener("click", instanceer.shower);
regLink?.addEventListener("click", instanceer.shower);
forgotMain?.addEventListener("click", instanceer.shower);

const logoutAnchor = document.getElementById("logout");

const getToHomePage = (e) => {
  e.preventDefault();
  localStorage.removeItem("userSettingsId");
  if (mainContainer.children.length > 0 && localStorage.getItem("workoutUserId")) {
  mainContainer.firstElementChild.replaceWith(loginPage());
  localStorage.removeItem("workoutUserId");
  greeting.innerHTML = "";
  const navFirst = document.createElement("h4");
  navFirst.innerHTML = "Aerobics";
  navFirst.style.color = "white";
  navbar.replaceChildren();
  navbar.appendChild(navFirst);
  } else mainContainer.appendChild(loginPage())
};
logoutAnchor.addEventListener("click", getToHomePage);

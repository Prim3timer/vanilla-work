import { homePage } from "./home.js";
import { performancePage } from "./performance.js";
import { settingsPage } from "./settings.js";
import { usersPage } from "./users.js";
import { ElementCatcher } from "./genFunc.js";
import { register } from "./register.js";
import myUrl from "./myUrl.js";
import { forgotPage } from "./forgotPassword.js";

const greeting = document.getElementsByClassName("greeting")[0];
const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];

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
const guestId = localStorage.getItem("userSettingsId");
const loginPage = document.getElementsByClassName("login")[0];
console.log(greeting);
const urlParams = new URLSearchParams(verifyUrl);
const email = urlParams.get("email");
const issuedTime = urlParams.get("elapsed");
console.log(email, issuedTime);
// console.log(forgotPage());

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementsByClassName("sign-up-anchor")[0];

const handleRefresh = async (e) => {
  if (guestId) {
    // navbar.replaceChildren();
    // navbar.children.className = "no-verify-window";
    // navbar.append(homeLInk, perfLInk, settinsLInk, usersLInk, logoutLInk);
    // mainContainer.insertBefore(navbar);
    // console.log(mainContainer);

    if (mainContainer.children.length > 0) {
      mainContainer.firstElementChild.replaceWith(homePage());
      return;
    } else {
      mainContainer.appendChild(homePage());
      return;
    }
  } else {
    if (mainContainer.children.length > 0) {
      // greeting.innerHTML = `hi, ${reply.name}`;
      mainContainer.firstElementChild.replaceWith(loginPage);
      return;
    } else {
      mainContainer.appendChild(loginPage);
      return;
    }
  }
};

// handleRefresh();
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
      localStorage.setItem("userSettingsId", reply.id);
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

const getVerified = async () => {
  try {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    greeting.innerHTML = `Hi, ${guestId && users.find((user) => user._id === guestId).username}`;
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

const containers = [
  homePage(),
  performancePage(),
  settingsPage(),
  usersPage(),
  register(),
  forgotPage(),
];

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
  mainContainer.firstElementChild.replaceWith(loginPage);
  greeting.innerHTML = "";
  const navFirst = document.createElement("h4");
  navFirst.innerHTML = "Aerobics";
  navFirst.style.color = "white";
  navbar.replaceChildren();
  navbar.appendChild(navFirst);
};
logoutAnchor.addEventListener("click", getToHomePage);

import { homePage } from "./home.js";
import { performancePage } from "./performance.js";
import { settingsPage } from "./settings.js";
import { usersPage } from "./users.js";
import { ElementCatcher } from "./genFunc.js";
import { register } from "./register.js";
import myUrl from "./myUrl.js";

const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];
const verifyUrl = document.location.search;
console.log(verifyUrl);
const urlParams = new URLSearchParams(verifyUrl);
const email = urlParams.get("email");
const issuedTime = urlParams.get("elapsed");
console.log(email, issuedTime);

const getVerified = async () => {
  if (email) {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
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
};

getVerified();

const containers = [
  homePage(),
  performancePage(),
  settingsPage(),
  usersPage(),
  register(),
];

const instanceer = new ElementCatcher(containers, mainContainer);
const webpages = navbar.children;
const regLink = document.getElementsByClassName("reg-link")[0];
// console.log(signUp);

webpages[0].addEventListener("click", instanceer.shower);
webpages[1].addEventListener("click", instanceer.shower);
webpages[2].addEventListener("click", instanceer.shower);
webpages[3].addEventListener("click", instanceer.shower);
regLink.addEventListener("click", instanceer.shower);

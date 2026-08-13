import { homePage } from "./home.js";
import { performancePage } from "./performance.js";
import { settingsPage } from "./settings.js";
import { usersPage } from "./users.js";
import { ElementCatcher } from "./genFunc.js";
import { register } from "./register.js";

const mainContainer = document.getElementById("main-page");
const navbar = document.getElementsByClassName("navbar")[0];

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

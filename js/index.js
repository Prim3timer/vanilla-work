import { homePage } from "./home.js";
import { performance } from "./performance.js";
import { settingsPage } from "./settings.js";
import { usersPage } from "./users.js";
import { mainSettings } from "./userSettings.js";
import { ElementCatcher } from "./genFunc.js";

const mainContainer = document.getElementById("main-page");
console.log(mainContainer);
const navbar = document.getElementsByClassName("navbar")[0];

const homePageDets = homePage();
const performanceDets = performance();
const settingsPageDets = settingsPage();
const userPageDets = usersPage();
const userSettingsPage = mainSettings();

const containers = [
  homePageDets,
  performanceDets,
  settingsPageDets,
  userPageDets,
  userSettingsPage,
];

// function ElementCatcher(pages) {
//   this.shower = async function (e) {
//     const result = await pages;
//     e.preventDefault();
//     const oneElement = result.map((content) => {
//       if (this.innerHTML == content.firstElementChild.innerHTML) {
//         console.log(content);
//         if (mainContainer.children.length > 0) {
//           mainContainer.firstElementChild.replaceWith(content);
//           return;
//         } else {
//           mainContainer.appendChild(content);
//           return;
//         }
//       }
//       return pages;
//     });
//   };
// }

const instanceer = new ElementCatcher(containers, mainContainer);
const webpages = navbar.children;

webpages[0].addEventListener("click", instanceer.shower);
webpages[1].addEventListener("click", instanceer.shower);
webpages[2].addEventListener("click", instanceer.shower);
webpages[3].addEventListener("click", instanceer.shower);
// webpages[4].addEventListener("click", instanceer.shower);

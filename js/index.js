import { homePage } from "./home.js";
import { performance } from "./performance.js";
import { settingsPage } from "./settings.js";

const mainContainer = document.getElementById("main-page");
console.log(mainContainer);
const navbar = document.getElementsByClassName("navbar")[0];

const homePageDets = homePage();
const aboutPageDets = performance();
const settingsPageDets = settingsPage();
console.log(homePageDets);

const navLinks = document.getElementsByClassName("nav-link");

function ElementCatcher(elements, matcher) {
  const containers = [homePageDets, aboutPageDets, settingsPageDets];
  console.log(homePageDets);
  this.shower = async function (e) {
    const result = await containers;
    e.preventDefault();
    const oneElement = result.map((content) => {
      if (this.innerHTML == content.firstElementChild.innerHTML) {
        //   console.log(this.innerHTML, containers[i].firstChild[i].innerHTML);
        if (mainContainer.children.length > 0) {
          mainContainer.firstElementChild.replaceWith(content);
          return;
        } else {
          mainContainer.appendChild(content);
          return;
        }
        // console.log(i);
        console.log(mainContainer.childNodes.length);
      }
      return containers;
    });
  };
}

const instanceer = new ElementCatcher(navbar.children, navLinks);

const router = (e) => {
  e.preventDefault();
};
console.log(navbar.childNodes[0]);
navbar.children[0].addEventListener("click", instanceer.shower);
navbar.children[1].addEventListener("click", instanceer.shower);
navbar.children[2].addEventListener("click", instanceer.shower);

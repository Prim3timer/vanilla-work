import myUrl from "./myUrl.js";
const userSettingsMain = document.createElement("div");
userSettingsMain.className = "user-settings";
const userSettingsHeader = document.createElement("h3");
userSettingsHeader.innerHTML = "user settings";
userSettingsMain.appendChild(userSettingsHeader);

// function ElementCatcher(pages) {
//   console.log(homePageDets);
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
//         console.log(mainContainer.childNodes.length);
//       }
//       return containers;
//     });
//   };
// }

// const instanceer = new ElementCatcher(pages);

const mainSettings = () => {
  return userSettingsMain;
};

export { mainSettings };

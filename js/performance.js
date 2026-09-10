import { timeClocking, timeToText, showDetWindow } from "./genFunc.js";
import myUrl from "./myUrl.js";

let globalData = [];
let globalUser = {};

const entryCount = document.createElement("span");

const userId = localStorage.getItem("workoutUserId") || "6a6695c18889470e03c937ec";

const performanceMain = document.createElement("div");
performanceMain.className = "performance";
const performanceHeader = document.createElement("h3");
//   performanceHeader.className = "performance-header";
//   performanceHeader.style.marginTop = "4rem";
performanceHeader.innerHTML = "performance";
performanceHeader.className = "performance-header";
performanceMain.appendChild(performanceHeader);
performanceMain.appendChild(entryCount);

let verifyWindow = document.createElement("div");
let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this entry?";

let verifyWindowButtonCont = document.createElement("article");
let alertWindow = document.createElement("p");
verifyWindow.className = "no-verify-window";
verifyWindow.style.padding = ".5rem";
verifyWindow.style.display = "flex";
verifyWindow.style.flexDirection = "column";
verifyWindow.style.rowGap = "1rem";
verifyWindow.style.alignItems = "center";
verifyWindow.style.backgroundColor = "lavender";
verifyWindow.style.position = "fixed";
verifyWindow.style.top = "40%";

alertWindow.className = "no-verify-window";
alertWindow.style.padding = "1rem";
alertWindow.style.fontSize = "1.5rem";
alertWindow.style.display = "flex";
alertWindow.style.flexDirection = "column";
alertWindow.style.rowGap = "1rem";
alertWindow.style.alignItems = "center";
alertWindow.style.color = "darkslateblues";
alertWindow.style.backgroundColor = "gainsboro";
alertWindow.style.position = "fixed";
alertWindow.style.top = "40%";

// verifyWindow.append(verifyWindowButtonCont);
let itemId = "";
// verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = `Yes <i class="fa-solid fa-trash"></i>`;
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

performanceMain.appendChild(verifyWindow);
performanceMain.appendChild(alertWindow);

const table = document.createElement("table");
const tableBody = document.createElement("tbody");
const headerRow = document.createElement("tr");
const dHeader = document.createElement("th");
const rHeader = document.createElement("th");
const exHeader = document.createElement("th");
const exDetsHeader = document.createElement("th");
const markHeader = document.createElement("th");
const dateHeader = document.createElement("th");
const deleteHeader = document.createElement("th");
// const delet = document.createElement("th");

tableBody.className = "performance-tbody"

dHeader.innerHTML = "duraton";
rHeader.innerHTML = "rounds completed";
exHeader.innerHTML = "overall effort (%)";
exDetsHeader.innerHTML = "exercises per round";
// markHeader.innerHTML = "mark (%)";
dateHeader.innerHTML = "date";
table.appendChild(tableBody);
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

noButton.addEventListener("click", () => {
  verifyWindow.className = "no-verify-window";
});

verifyWindowButtonCont.className = "verify-window-cont";

const deleteEntry = async () => {
  try {
    const response = await fetch(`${myUrl}/performance/${itemId}`, {
      method: "DELETE",
    });
    if (response) {
      const reply = await response.json();
      const filterate = globalData.filter((data) => data.userId === userId);
      const entryFilterate = filterate.filter((entry) => entry._id != itemId);
      globalData = entryFilterate;
  

      tableBody.replaceChildren();
      tableBody.appendChild(headerRow);
      alertWindow.innerHTML = reply;
      alertWindow.className = "verify-window";
      entryCount.innerHTML = `(${entryFilterate.length} entries)`;
      for (let i = 0; i < entryFilterate.length; i++) {
        const dets = document.createElement("tr");
        dets.style.backgroundColor = `${i % 2 === 0 ? "white" : "khaki"}`;
        tableBody.appendChild(dets);
        // perfy is a document in the performance cluster in the database.
        const perfy = entryFilterate[i];
        const { workSettings } = globalUser;
        const endurance = document.createElement("td");
        const { duration } = perfy.exerciseTimings[0];
        endurance.innerHTML = timeClocking(duration);
        const roundCount = document.createElement("td");
        roundCount.innerHTML = `${perfy.exerciseTimings[3].numberOfRounds}`;
        const mark = document.createElement("td");
        const exDet = document.createElement("td");
        mark.innerHTML = `${parseInt(perfy.mark.toFixed(2))}`;
        exDet.innerHTML = `${globalUser.workSettings?.exercise.length}`;

        const date = document.createElement("td");
        const del = document.createElement("td");
        date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          // hour: "numeric",
          // minute: "numeric",
          // second: "numeric",
        });
        del.style.fontSize = "1.5rem";

        const removeVerifier = () => {
          verifyWindow.className = "no-veriy-window";
        };
        del.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        const getId = async (id) => {
          itemId = id;
          verifyWindow.className = "verify-window";
          verifyWindowButtonCont.className = "verify-button-cont";
        };

        del.addEventListener("click", () => getId(perfy._id));
        dets.append(roundCount, endurance, mark, exDet, date);
        for (const child of dets.children){
          child.addEventListener("click", () => showDetWindow(perfy, duration, performanceMain))
        }
        dets.append(del);
        userId && performanceMain.append(table);
      }

      verifyWindow.className = "no-verify-window";
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      alertWindow.className = "no-verify-window";
    }, 3000);
  }
};

const getData = async (id) => {
  tableBody.appendChild(headerRow);
  const response = await fetch(`${myUrl}/performance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response2 = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response2.json();
  const user = users.find((user) => user._id == id);
  globalUser = user;
  const foundUserRoles = Object.keys(user.roles);
  yesButton.addEventListener("click", deleteEntry);
  let perfData = await response.json();
  globalData = perfData;
  const filteredData = perfData.filter((data) => data.userId === id);
  entryCount.innerHTML = `(${filteredData.length} entries)`;

  for (let i = 0; i < filteredData.length; i++) {
    const dets = document.createElement("tr");
    dets.style.backgroundColor = `${i % 2 === 0 ? "white" : "khaki"}`;
    tableBody.appendChild(dets);
    const perfy = filteredData[i];
    const { duration } = perfy.exerciseTimings[0];
    

    const { workSettings } = user;
    const endurance = document.createElement("td");

    endurance.innerHTML = timeClocking(duration);
    endurance.addEventListener("click", showDetWindow);
    const roundCount = document.createElement("td");
    roundCount.addEventListener("click", showDetWindow);
    roundCount.innerHTML = `${perfy.exerciseTimings[3].numberOfRounds}`;
    const mark = document.createElement("td");
    mark.addEventListener("click", showDetWindow);
    const exDet = document.createElement("td");
    exDet.addEventListener("click", showDetWindow);
    mark.innerHTML = `${parseInt(perfy.mark)}`;
    exDet.innerHTML = `${perfy.exerciseDets.length}`;
    const date = document.createElement("td");
    date.addEventListener("click", showDetWindow);
    const del = document.createElement("td");
    date.innerHTML = new Date(perfy.date).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    });
    const removeVerifier = () => {
      verifyWindow.className("veriy-window");
    };
    // const icon = document.createElement("i");
    // icon.classList.add("fa-solid", "fa-trash");

    // del.appendChild(icon);
    del.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    del.style.fontSize = "1.5rem";

    const getId = async (id) => {
      itemId = id;
      verifyWindowButtonCont.className = "verify-button-cont";
      verifyWindow.className = "verify-window ";
    };

    del.addEventListener("click", () => getId(perfy._id));
    dets.append(endurance, roundCount,  mark, exDet, date, del);
    // detsWindow.className = "no-verify-window";

    performanceMain.append(table);
  }
  const navbar = document.getElementsByClassName("navbar")[0];
  const getDatas = document.getElementsByClassName("get-data")[0];
  const perfContainer = document.createElement("section");
};


getData(userId);
const performancePage = () => {

  return performanceMain;
};

export { performancePage, getData };

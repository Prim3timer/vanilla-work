import myUrl from "./myUrl.js";
import { populate } from "./settings.js";
import { getData, performancePage } from "./performance.js";

const timeClocking = (sec) => {
  return ` ${
    sec > 3600
      ? `${Math.floor(sec / 3600)}:${Math.floor((sec % 3600) / 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) / 60)}:${Math.floor((sec % 3600) % 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) % 60)} `
      : sec < 10
        ? `0:0${sec % 60}`
        : sec < 60
          ? `0:${sec % 60}`
          : sec % 60 >= 10
            ? `${Math.floor(sec / 60)}:${sec % 60}`
            : sec < 10
              ? 0`${sec % 60}`
              : `${Math.floor(sec / 60)}:0${sec % 60}`
  }`;
};
const timeToText = (sec) => {
  return ` ${
    // if sec is greater than an hour
    sec > 3600
      ? `${Math.floor(sec / 3600)}hrs, ${Math.floor((sec % 3600) / 60)}min, ${Math.floor((sec % 3600) % 60) < 10 ? 0 : ""}${Math.floor((sec % 3600) % 60)}s `
      : sec < 10
        ? `${sec % 60}s`
        : sec < 60
          ? ` ${sec % 60}s`
          : sec % 60 >= 10
            ? `${Math.floor(sec / 60)}min, ${sec % 60}s`
            : sec < 10
              ? `${sec % 60}s`
              : `${Math.floor(sec / 60)}min, ${sec % 60}s`
  }`;
};

// 1. Select the root element containing the target child
const rootElement = document.getElementById('main-page'); 

// 2. Define the callback function to run when a change is detected
const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        // Check if a child node was added or removed
        if (mutation.type === 'childList') {
            console.log('Child element changed. Reloading page...');
            window.location.reload();
            break; // Stop looping once we trigger the reload
        }
    }
};

// 3. Create the observer instance
const observer = new MutationObserver(callback);


function ElementCatcher(pages, mainContainer, guestId) {
  this.shower = async function (e) {
   const roles =  JSON.parse(localStorage.getItem("roles"))
   e.preventDefault();
    console.log(roles)
    console.log(guestId)
    const result = await pages;
    const oneElement = result.map((content) => {
      if (
        guestId ||
        this.innerHTML == "forgot" ||
        this.innerHTML == "reg-link" ||
        this.innerHTML == "usersettings" 
      ) {
        if (this.id == content.className) {
          if (this.id == "settings"){
            populate()
          }
          if (!roles.includes(5150 ) && this.innerHTML == "users"){
            console.log("unauthorized")
          } else {
            localStorage.setItem("current-page", content.className)
            if (mainContainer.children.length > 0) {
              
              mainContainer.firstElementChild.replaceWith(content);

              return;
            } else {
              mainContainer.appendChild(content);
              
            }
          }
        }
        // window.location.reload();
//         observer.observe(rootElement, { childList: true,
// subtree: false
// });
      }
      return content;
    });
}
}

const getSpecificPage = (e, page, mainContainer) => {
    e.preventDefault()
     if (mainContainer.children.length > 0) {
            mainContainer.firstElementChild.replaceWith(page());
            return;
          } else {
            mainContainer.appendChild(page());
          }
  }

  const showDetWindow = (perfy, duration, performanceMain) => {
        let detsWindowCover = document.createElement("section");
        let detsWindow = document.createElement("div");
        detsWindow.style.padding = ".5rem";
        let detsDuration = document.createElement("p");
        let detsExHeader = document.createElement("h4");
        let detsExList = document.createElement("ol");
        let numberOfExercises = document.createElement("p");
  
        perfy.exerciseDets.map((exercise) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = exercise;
          detsExList.append(listItem);
        });
        // console
        let closure = document.createElement("p");
        closure.style.position = "absolute";
        closure.style.top = "0px";
        closure.style.right = "0px";
        closure.addEventListener("click", () => {
          // detsWindow.className = "no-verify-window";
          detsWindowCover.className = "no-verify-window";
        });
        closure.style.position = "abolute";
        closure.innerHTML = `<i class="fa-solid fa-x"></i>`;
        detsWindowCover.className = "dets-verify-window";
        detsWindow.className = "inner-dets-verify-window";
        detsWindow.appendChild(detsDuration);
        detsWindow.appendChild(closure);
        detsWindow.appendChild(detsExHeader);
        detsWindow.appendChild(detsExList);
        detsWindow.appendChild(numberOfExercises);
        let detNumberOfRounds = document.createElement("p");
        let detExDuration = document.createElement("p");
        let detsInterval = document.createElement("p");
        // detsExList.replaceChildren();
        const betweenExes = perfy.exerciseTimings[2].interval;
        const exerciseLength = perfy.exerciseTimings[1].exercisesDuration;
        // detNumberOfRounds.innerHTML = `number of rounds: ${perfy.exerciseTimings[3].numberOfRounds}`;
        detsInterval.innerHTML = `interval b/w exercises: ${timeToText(betweenExes)}`;
        detExDuration.innerHTML = `duration of each exercise: ${timeToText(exerciseLength)}`;
        detsDuration.innerHTML = `duration: ${timeToText(duration)}`;
        detsExHeader.innerHTML = `exercises list:`;
        numberOfExercises.innerHTML = `completed exercises: ${perfy.oneExercise}`;
        detsWindow.append(detsInterval, detExDuration);
        if (detsWindowCover.contains(detsWindow)) {
          console.log("yes");
          detsWindow.remove();
          detsWindowCover.appendChild(detsWindow);
        } else {
          console.log("no");
          detsWindowCover.appendChild(detsWindow);
        }
        performanceMain.appendChild(detsWindowCover);
      };

export { timeClocking, timeToText, ElementCatcher, getSpecificPage, showDetWindow };

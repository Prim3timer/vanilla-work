import myUrl from "./myUrl.js";
import { timeClocking } from "./genFunc.js";
let ID;
let sec = 0;

console.log(sec)

const greeting = document.getElementsByClassName("p");
greeting.className = "greeting";
let pauser = document.createElement("button");
let jogup = document.createElement("p");
let goContainer = document.createElement("div");
let cycle = document.createElement("p");
cycle.className = "indicator";
cycle.id = "clock";
goContainer.id = "go-container";
let go = document.createElement("p");
go.id = "go";
let pIndex = 0;
let saver = document.createElement("button");
saver.className = "saver";
saver.innerHTML = `<i class="fa-solid fa-save"></i>`;
let rightContainer = document.createElement("section");
rightContainer.className = "right-container";
let copyRight = document.createElement("span");
let copyRight2 = document.createElement("span");

let rounder = document.createElement("p");
const current = new Date().getFullYear();
copyRight.className = "copy-right";
copyRight2.className = "copy-right";
copyRight.innerHTML = `&copy;`;
copyRight2.innerHTML = `${current} Amalu Productions`;
rightContainer.append(copyRight, copyRight2);
let begin;
let alertWindow = document.createElement("p");
alertWindow.style.fontSize = "1.5rem";
alertWindow.style.position = "fixed";
alertWindow.style.top = "40%";
let integrityCheck = 0;
alertWindow.style.fontSize = "1.5rem";
alertWindow.className = "no-verify-window";
const userId = localStorage.getItem("workoutUserId") || "6a6695c18889470e03c937ec";
const response = await fetch(`${myUrl}/workout-users`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

const users = await response.json();
const user = users.find((user) => user._id === userId);
console.log(user);

// greeting.innerHTML = `welcome, ${user.username}`;
let round = 1;
const { exercise, interval, exercisesDuration, numberOfRounds } =
  user.workSettings;

rounder.innerHTML = `R ${round} of ${numberOfRounds}`;

let controls = {
  pause: false,
  rewind: false,
  complete: "no",
  runFunc: true,
};

let exerciseCont = document.createElement("article");
exerciseCont.id = "exercise-cont";

// hard coat for now
const elements = exercise.map((exercise) => {
  const newP = document.createElement("p");
  newP.className = "exercise";
  newP.innerHTML = exercise;
  exerciseCont.appendChild(newP);
  return newP;
});
console.log(elements[0]);

const noExAlertElement = document.createElement("p");
noExAlertElement.style.minWidth = "80%";
noExAlertElement.innerHTML =
  `you have not chosen any exercises yet. click on "settings" tab to make entry`;
if (exerciseCont.children.length === 0) {
  exerciseCont.appendChild(noExAlertElement);
  exerciseCont.style.backgroundColor = "darkslateBlue";
  exerciseCont.style.justifyContent = "center";
  exerciseCont.style.alignItems = "center";
  exerciseCont.style.color = "white"
  exerciseCont.style.fontSize = "1.5rem";
}

goContainer.append(go, saver);
jogup.id = "jog-up";
jogup.innerHTML = "Mark Time";
const dashboard = document.createElement("div");
dashboard.className = "indicator-container";
// dashboard.style.backgroundColor = "yellow";
const firstCont = document.createElement("div");
firstCont.className = "home";
const statusContainer = document.createElement("section");
statusContainer.id = "status-container";
statusContainer.append(dashboard);

// clock.style.display = "flex";
// clock.style.border = "2px solid brown";

// clock.className = "indicator";
// clock.id = "clock";
rounder.className = "indicator";
rounder.id = "round";
cycle.innerHTML = sec;
dashboard.append(cycle, rounder, jogup);
let rewind = document.createElement("button");
let forward = document.createElement("button");
let roundUp = document.createElement("button");
const homePage = () => {
  console.log(myUrl);
  //   rounder.innerHTML = round;
  firstCont.id = "home-page";
  firstCont.style.display = "flex";
  firstCont.style.flexDirection = "column";
  firstCont.style.width = "100vw";
  firstCont.style.justifyContent = "flex-start";
  let controls = {
    pause: false,
    rewind: false,
    complete: "no",
    runFunc: true,
  };
  pauser.id = "halter";
  pauser.innerHTML = `<i class="fa-solid fa-play">`;
  rewind.innerHTML = `<i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i>`;
  rewind.id = "backer";
  forward.id = "foward";
  forward.innerHTML = `<i class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i>`;
  roundUp.id = "round-up";
  roundUp.innerHTML = `R <i class="fa-solid fa-forward-fast">`;

  const buttonsCont = document.createElement("div");
  for (let i = 0; i < buttonsCont.children.length; i++) {}

  buttonsCont.append(rewind, pauser, forward, roundUp);
  console.log(buttonsCont.children.length);
  buttonsCont.id = "buttons";
  buttonsCont.style.display = "flex";
  buttonsCont.style.flex = "0 1 15%";
  buttonsCont.style.width = "90vw";

  const firstContent = document.createElement("p");
  firstCont.append(firstContent);

  firstCont.append(
    buttonsCont,
    statusContainer,
    goContainer,
    rightContainer,
    exerciseCont,
    alertWindow,
  );

  firstContent.innerHTML = "home";
  firstContent.style.visibility = "hidden";
  return firstCont;
};

jogup.style.transitionDuration = "500ms";

let RoundInspector = 3000;
function general(currentItem, formerItem, nextItem) {
  console.log(currentItem);
  let { complete } = controls;
  complete = "no";
  return new Promise((resolve, reject) => {
    formerItem.style.transform = "scale(1 )";
    formerItem.style.backgroundColor = "darkorange";
    formerItem.style.color = "yellow";
    formerItem.style.boxShadow = "0em 0em 0em";
    formerItem.style.zIndex = pIndex - 1;
    



    jogup.style.transitionProperty = "scale(2) translateX(40px) flex width";
    jogup.style.transform = "scale(2) translateX(40px)";
    jogup.style.color = "yellow";
    jogup.style.backgroundColor = "green";
    jogup.style.border = "2px solid green";
    jogup.style.flex = "0 0 8rem";
    jogup.style.width = "25rem";
    jogup.style.boxShadow = "0.6em 0.6em .6em gray";

    // change the content of the set element back to  the 'round' variable
    // after 3 seconds
    setTimeout(() => {
      go.style.transitionProperty = "font-size width height";
      go.style.transitionDuration = "400ms";
      go.style.fontSize = "4rem";
      go.style.height = "4rem";
      go.style.whiteSpace = "no-wrap";
      go.style.margin = "1rem 0";
      go.innerHTML = `Let's Work!`;
    }, RoundInspector);
    // transfrorm the current excercise element after interval elapses
    // an interval to check for when sec exceeds interval

    const { exercise, interval } = user.workSettings;
    ID = window.setInterval(() => {
      if (sec === interval) {
        // the current excercise is currentItem
        currentItem.style.position = "relative";
        // It is used to make the current excersise appear above
        //  previous and next excercises
        currentItem.style.zIndex = pIndex;
        currentItem.style.left = `${sec * Math.sin(sec * 4 * Math.PI)}px`


        const exerciseIndex = exercise.indexOf(currentItem.innerHTML);
        console.log(exerciseIndex);
        const indexDiff =
          exercise.length - exercise.indexOf(currentItem.innerHTML);
        const indexSum =
          exercise.length - exercise.indexOf(currentItem.innerHTML);
        const translator =
          exerciseIndex < Math.floor(exercise.length / 2)
            ? `${((exercise.length - exerciseIndex) / exercise.length) * (exercise.length - exerciseIndex * 2) * 15}px`
            : exerciseIndex === Math.floor(exercise.length / 2) ||
                (exercise.length === 4 && exerciseIndex === 1)
              ? "0px"
              : exerciseIndex > Math.floor(exercise.length / 2)
                ? `-${((exerciseIndex + 1) / exercise.length) * exerciseIndex * 15}%`
                : "";

        formerItem.style.color = "sandybrown";
        formerItem.style.backgroundColor = "maroon";

        currentItem.style.transform = `scale(3) translate(${translator}, -15px)`;
        currentItem.style.fontSize =
          currentItem.innerHTML.length > 7
            ? "1.5rem"
            : currentItem.innerHTML.length > 10
              ? ".8rem"
              : "2rem";
        currentItem.style.color = "yellow";
        currentItem.style.backgroundColor = "green";
        currentItem.style.boxShadow = "0.2em 0.3em 0.4em gray";
        currentItem.style.padding = "0 1rem";
        currentItem.style.justifySelf = "center";
        currentItem.style.transitionDuration = "500ms";

        jogup.style.transform = "scale(1) translateX(10px)";
        jogup.style.color = "sandybrown";
        jogup.style.backgroundColor = "maroon";
        jogup.style.border = "2px solid maroon";
        jogup.style.boxShadow = "0em 0em 0em";

        // the variable for the z-index.
        pIndex++;
        let round = 1;
        //clearInterval(planks);
      }

      // pausing the app.
      cycle.innerHTML = timeClocking(sec);
      if (controls.pause === true) {
        return;
      } else {
        sec++;
        integrityCheck++;
      }

      // giving the athlete notice to start preparing for the next excercise
      if (
        (sec > interval - 3 && sec <= interval) ||
        (sec > exercisesDuration + interval - 3 &&
          sec <= exercisesDuration + interval - 3)
      ) {
        cycle.style.color = "darkorange";
        //cycle element's color goes back to normal after warning.
      } else cycle.style.color = "purple";

      // if one exercise is complete, change controls.complete to "yes" and if controls.complete = 'yes', resolve the promise
      if (sec > exercisesDuration + interval) {
        complete = "yes";
        if (complete === "yes") {
          resolve(console.log("resolved"));
          if (integrityCheck / (exercisesDuration + interval) < 1) {
            anExercise = anExercise;
            console.log("don't add");
          } else {
            anExercise++;
          }
          clearInterval(ID);
        } else reject("not resolved");
        integrityCheck = 0;
        sec = 0;
      }
      // rate of sec change
      if (sec > 4) {
        cycle.style.transitionProperty =
          "font-size, height, width, border, grid-template-columns";
        cycle.style.transitionDuration = "2s";
        cycle.style.fontSize = sec > 10000 ? "3.5rem" : "4.5rem";
        cycle.style.height = "6rem";
        cycle.style.width = "15rem";
        cycle.style.border = "2px solid brown";
        cycle.style.gridTemplateColumns = "5.5rem";
        cycle.transitTimingFunction = "ease-in";
        // cycle.style.transitionDelay = '.5s'

        rounder.style.transitionProperty =
          "font-size, height, border-right, border-top, border-bottom, flex";
        rounder.style.transitionDuration = "2s, 2s, .6s, .6s, 2s, 1.5s";
        // rounder.style.transitionDuration = '.5s'
        rounder.style.transitTimingFunction = "ease-in";

        rounder.style.fontSize = "3rem";
        rounder.style.height = "5rem";
        rounder.style.borderRight = "2px solid brown";
        rounder.style.borderTop = "2px solid brown";
        rounder.style.borderBottom = "2px solid brown";
        rounder.style.flex = "0 1 20rem";
        // rounder.style.transitionDelay = '.1s'

        dashboard.style.transitionProperty = "flex";
        dashboard.style.transitionDuration = "1.2s";
        // dashboard.transitTimingFunction = 'ease-in'
        dashboard.style.flex = "0 1 20%";
        // dashboard.style.transitionDelay = '.2s'
      }
    }, 1000);
  });
}

const saveWork = async () => {
  const end = Date.now();
  let duration = Math.floor((end - begin) / 1000);
  console.log(begin);
  console.log(duration);

  const { exercise, numberOfRounds, exercisesDuration, interval, oneExercise } =
    user.workSettings;
  const workDets = {
    exerciseTimings: [
      { duration },
      { exercisesDuration },
      { interval },
      { numberOfRounds: round },
    ],
    oneExercise: anExercise,
    date: new Date(),
    userId,
    exerciseDets: exercise,
    mark:
      // do not exceed 100% no matter how many times an exercise is repeated.
      anExercise / (exercise.length * numberOfRounds) <= 1
        ? (anExercise / (exercise.length * numberOfRounds)) * 100
        : 100,
  };
  console.log(workDets);
  console.log(myUrl);
  const response = await fetch(`${myUrl}/performance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workDets),
  });
  // const content = await response.json();
  // console.log(content);
  const reply = await response.json();
  console.log(reply);
  alertWindow.innerHTML = reply;
  alertWindow.className = "verify-window";
  setTimeout(() => {
    alertWindow.className = "no-verify-window";
  }, 3000);
};

saver.addEventListener("click", saveWork);
let anExercise = 0;

let reality = async () => {
  controls.runFunc = false;
  try {
    for (let i = 0; i < elements.length; i++) {
      const currentItemIndex = elements[i];
      // if i = 0 subtract array length from index else subtract 1 from index``
      const formerIemIndex = elements[i == 0 ? i + elements.length - 1 : i - 1];
      const nextItemIndex = elements[i + 1];
      for (let j = 0; j < elements.length; j++) {
        elements[j].addEventListener("click", () => {
          i = elements.indexOf(elements[j]) - 1;
          // get to the end of the exercise so the next one can quickly begin
          console.log(integrityCheck);
          sec = interval + exercisesDuration;
          // reverse many other events at the push of any axercise
          elements.map((element) => {
            if (
              // if any exercise is Active, deactivate it
              element.style.color == "yellow" &&
              element.style.backgroundColor == "green"
            ) {
              element.style.color = "sandybrown";
              element.style.backgroundColor = "maroon";
              element.style.transform = "scale(1)";
              element.style.boxShadow = "0em 0em 0em";
            } else if (
              // if any exercise is in transition to invactive state, make it instantly inactive
              element.style.backgroundColor == "darkorange"
              // elements.indexOf(element) != i - 1
            ) {
              element.style.backgroundColor = "maroon";
              element.style.color = "sandybrown";
            }
          });
        });
      }

      // looping through the elements in the exercise array
      await general(currentItemIndex, formerIemIndex, nextItemIndex);
    }
  } catch (error) {
    console.log(error + " at all");
  } finally {
    // increase the value of round after a set is complete
    round++;
    // temporarily change the content of the set element to 'well done'

    if (round == numberOfRounds - 1) {
      go.innerHTML = `the home stretch!`;
      RoundInspector = 10000;
    } else if (round === numberOfRounds) {
      RoundInspector = 15000;

      go.innerHTML = "one more round!";
    } else {
      RoundInspector = 3000;
      go.innerHTML = `Well Done!`;
    }
    // if five sets have not been completed, keep repeating the sets
    //by invoking the reality function
    console.log(numberOfRounds, round);
    if (round <= numberOfRounds) {
      rounder.innerHTML = `R ${round} of ${numberOfRounds}`;
      reality();
      //   round++;
    } else {
      // otherwise change the content of the set element to 'congrats'
      // and shutdown the programm
      go.innerHTML = "Congrats!";
      round = numberOfRounds;
      rounder.innerHTML = `R ${round} of ${numberOfRounds}`;
      sec = 0;
      cycle.innerHTML = ":00";
      pauser.innerHTML = `<i class="fa-solid fa-play"></i>`;
      controls.runFunc = true;
      elements.map((element) => {
        if (element.style.backgroundColor == "green") {
          element.style.backgroundColor = "maroon";
          element.style.color = "sandybrown";
          element.style.boxShadow = "0em 0em 0em";
          element.style.transform = "scale(1)";
        }
      });
      saveWork();
    }
  }
};

pauser.addEventListener("click", () => {
  let { runFunc, pause } = controls;
  //the unique condition is desinged to let this event
  //handler invoke the reality function just once
  if (runFunc === true) {
    begin = Date.now();
    pauser.innerHTML = `<i class="fa-solid fa-pause"/>`;
    reality();
  } else if (controls.pause === false) {
    //console.log(runFunc)
    controls.pause = true;
    // cycle.innerHTML = sec;
    pauser.innerHTML = `<i class="fa-solid fa-play"></i>`;
  } else {
    controls.pause = false;
    pauser.innerHTML = `<i class="fa-solid fa-pause"/>`;
  }
});

roundUp.addEventListener("click", () => {
  if (round === numberOfRounds) {
    round = 0;
    rounder.innerHTML = `R ${round} of ${numberOfRounds}`;
  }
  if (round < numberOfRounds) {
    round++;
    rounder.innerHTML = `R ${round} of ${numberOfRounds}`;
  }
});

rewind.addEventListener("click", decreaser);

function decreaser(e) {
  sec -= 1;
  setInterval(() => {
    if (sec < 1) sec = 0;
    cycle.innerHTML = timeClocking(sec);
  }, 10);
}

let increaser = (e) => {
  sec += 1;
  setInterval(() => {
    if (sec > exercisesDuration + interval - 1)
      sec = exercisesDuration + interval;
    cycle.innerHTML = timeClocking(sec);
  }, 10);
};

forward.addEventListener("click", increaser);


export { homePage };

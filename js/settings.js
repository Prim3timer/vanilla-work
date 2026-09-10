import myUrl from "./myUrl.js";
import { timeClocking } from "./genFunc.js";

const settingsCont = document.createElement("div");
settingsCont.className = "settings";
const innerSettingsElement = document.createElement("section");
const settingsHeader = document.createElement("h3");
settingsHeader.className = "settings-header"
const settingsInstructions = document.createElement("p");
settingsInstructions.innerHTML =
"Please setup your exercise routine";
settingsInstructions.className = "settings-instructions"
const settingsForm = document.createElement("form");
settingsForm.className = "exercise-settings-form";


let alertWindow = document.createElement("p");
alertWindow.style.fontSize = "1.5rem";

const firstExercise = document.createElement("input");
firstExercise.placeholder = "enter exercise";
const secondExercise = document.createElement("input");
secondExercise.placeholder = "enter exercise (optional)";
const thirdExercise = document.createElement("input");
thirdExercise.placeholder = "enter exercise (optional)";
const fourthExercise = document.createElement("input");
fourthExercise.placeholder = "enter exercise (optional)";
const fifthExercise = document.createElement("input");
fifthExercise.placeholder = "enter exercise (optional)";
settingsCont.className = "settings";
const breaker = document.createElement("br");
const breaker3 = document.createElement("br");
const intervalLabel = document.createElement("label");
intervalLabel.className = "interval-label"
intervalLabel.innerHTML = "interval b/w exercises:";
const intervalHourInput = document.createElement("input");
const intervalMinInput = document.createElement("input");
const intervalSecInput = document.createElement("input");

intervalHourInput.className = "interval-input";
intervalMinInput.className = "interval-input";
intervalSecInput.className = "interval-input";

const columnElement = document.createElement("span")
columnElement.innerHTML = ":"
columnElement.className = "column-element"

const hourLabel = document.createElement("label")
const minuteLabel = document.createElement("label")
const secondLabel = document.createElement("label")
hourLabel.innerHTML = "hr"
minuteLabel.innerHTML = "min"
secondLabel.innerHTML = "s"
hourLabel.append(breaker, intervalHourInput)
hourLabel.className = "hour-label"
minuteLabel.className = "minute-label"
secondLabel.className = "second-label"
minuteLabel.append(intervalMinInput)
secondLabel.append(intervalSecInput)
// intervalLabel.append(breaker, intervalHourInput, columnElement, intervalMinInput, columnElement.cloneNode(true), intervalSecInput);
intervalLabel.append(hourLabel, columnElement, minuteLabel, columnElement.cloneNode(true), secondLabel);
const exerciseDurationLabel = document.createElement("label");
exerciseDurationLabel.innerHTML = "exercise duration:";
exerciseDurationLabel.className = "duration-label"



const exerciseDurationHourInput = document.createElement("input");
const exerciseDurationMinInput = document.createElement("input");
const exerciseDurationSecInput = document.createElement("input");
exerciseDurationSecInput.required = true;
exerciseDurationHourInput.className = "exercise-duration-input";
exerciseDurationMinInput.className = "exercise-duration-input";
exerciseDurationSecInput.className = "exercise-duration-input";
exerciseDurationLabel.append(breaker.cloneNode(true), exerciseDurationHourInput, columnElement.cloneNode(true), exerciseDurationMinInput, columnElement.cloneNode(true), exerciseDurationSecInput);

exerciseDurationHourInput.placeholder = "HH"
exerciseDurationMinInput.placeholder = "MM"
exerciseDurationSecInput.placeholder = "SS"
const numberOfRoundsLabel = document.createElement("label");
numberOfRoundsLabel.className = "number-of-rounds-label"
numberOfRoundsLabel.innerHTML = "number of rounds:";
const numberOfRoundsInput = document.createElement("input");
numberOfRoundsInput.className = "number-of-rounds-input";
numberOfRoundsLabel.append(breaker3, numberOfRoundsInput);
const settingsButton = document.createElement("button");
settingsButton.className = "done-settings";
settingsButton.innerHTML = "submit";
const thirdContent = document.createElement("h3");


 intervalHourInput.placeholder = "HH";
 intervalMinInput.placeholder = "MM";
 intervalSecInput.placeholder = "SS";
  // exerciseDurationInput.placeholder = "numbers only";
  numberOfRoundsInput.placeholder = "numbers only";
const settingsPage = () => {
  settingsForm.append(
    firstExercise,
    secondExercise,
    thirdExercise,
    fourthExercise,
    fifthExercise,
    intervalLabel,
    exerciseDurationLabel,
    numberOfRoundsLabel,
  );
  settingsCont.append(
    settingsHeader,
    thirdContent,
    settingsInstructions,
    settingsForm,
    settingsButton,
    alertWindow,
  );
  settingsHeader.innerHTML = "settings";
  return settingsCont;
};

const exes = [
  firstExercise,
  secondExercise,
  thirdExercise,
  fourthExercise,
  fifthExercise,
];
// const userId = "6a6695c18889470e03c937ec";
const userId = localStorage.getItem("workoutUserId");
const populate = async () => {
  console.log(userId);
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();

  const user = users.find((user) => user._id === userId);
  console.log(user)
  if (user) {
    const { workSettings } = user;
    exes[0].value = workSettings.exercise[0] || "";
  exes[1].value = workSettings.exercise[1] || "";
  exes[2].value = workSettings.exercise[2] || "";
  exes[3].value = workSettings.exercise[3] || "";
  exes[4].value = workSettings.exercise[4] || "";
  
  intervalHourInput.value = workSettings.interval >= 3600 ? Math.floor(workSettings.interval / 3600) : 0;
  intervalMinInput.value = Math.floor(workSettings.interval % 3600) >= 60 && Math.floor(workSettings.interval % 3600) < (60 * 60) ?  Math.floor(workSettings.interval % 3600 / 60) : 0;
  intervalSecInput.value = workSettings.interval % 3600  % 60  < 60 ? Math.floor(workSettings.interval % 3600 % 60)  : 0;
  
  exerciseDurationHourInput.value =  workSettings.exercisesDuration >= 3600 ? Math.floor(workSettings.exercisesDuration / 3600) : 0;
  exerciseDurationMinInput.value =  Math.floor(workSettings.exercisesDuration % 3600) >= 60 && Math.floor(workSettings.exercisesDuration % 3600) < (60 * 60) ?  Math.floor(workSettings.exercisesDuration % 3600 / 60) : 0;
  exerciseDurationSecInput.value = workSettings.exercisesDuration % 3600  % 60  < 60 ? Math.floor(workSettings.exercisesDuration % 3600 % 60)  : 0;
  
  console.log(workSettings.interval)
  numberOfRoundsInput.value = workSettings.numberOfRounds || "";
  
};
}

populate();

const editUser = async (e) => {
  e.preventDefault();
  console.log(myUrl);
  console.log(userId);
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();

  const rawExercise = [
    exes[0].value,
    exes[1].value,
    exes[2].value,
    exes[3].value,
    exes[4].value,
  ];
  const filteredExercise = rawExercise.filter(
    (item) => item !== "undefined" && item !== "",
  );
  console.log(filteredExercise);
  if (users) {
    const hourInterval = !intervalHourInput.value ? 0 : Number(intervalHourInput.value)
    const minInterval = !intervalMinInput.value ? 0 : Number(intervalMinInput.value)
    const secInterval = !intervalSecInput.value ? 0 : Number(intervalSecInput.value)
    console.log(minInterval)
    
    const hourDuration = !exerciseDurationHourInput.value ? 0 : Number(exerciseDurationHourInput.value)
    const minDuration = !exerciseDurationMinInput.value ? 0 : Number(exerciseDurationMinInput.value)
    console.log(exerciseDurationHourInput.value)
    console.log(typeof(minDuration))
    const workerSettings = {
      exercise: filteredExercise,
      interval: (hourInterval * 60 * 60) + (Number(minInterval) * 60) + Number(secInterval) || 0,
      exercisesDuration: (hourDuration * 60 * 60) + (Number(minDuration) * 60) + Number(exerciseDurationSecInput.value),
      numberOfRounds: numberOfRoundsInput.value || 1,
    };
    console.log(workerSettings);
    console.log(workerSettings);
    const user = users.find((user) => user._id === userId);
    
    if (filteredExercise.length < 1) {
      console.log("exercise list is too short. make it at least 2");
        alertWindow.innerHTML = "exercise list is too short. make it at least 1";
      alertWindow.className = "verify-window";
      alertWindow.style.position = "fixed";
      alertWindow.style.top = "40%";
    } else if (Number(exerciseDurationHourInput.value) + Number(exerciseDurationMinInput.value) + Number(exerciseDurationSecInput.value) == 0) {
      alertWindow.innerHTML = `the exercise duration field must be filled.` 
      alertWindow.className = "verify-window";
      alertWindow.style.position = "fixed";
      alertWindow.style.top = "40%";
        setTimeout(() => {
        alertWindow.className = "no-verify-window";
      }, 5000);
    } else {
      const respone2 = await fetch(`${myUrl}/workout-users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workerSettings),
      });
      const reply = await respone2.json();
      alertWindow.innerHTML = reply;
      alertWindow.className = "verify-window";
      alertWindow.style.position = "fixed";
      alertWindow.style.top = "40%";
      setTimeout(() => {
        alertWindow.className = "no-verify-window";
      }, 3000);
      console.log(reply);

    }
  }
};

settingsButton.addEventListener("click", editUser);

export { settingsPage, populate };

import myUrl from "./myUrl.js";

const settingsCont = document.createElement("div");
settingsCont.className = "settings";
const innerSettingsElement = document.createElement("section");
const settingsHeader = document.createElement("h3");
const settingsIntructions = document.createElement("p");
settingsIntructions.innerHTML =
  "Please populate the input fields with your exercises of choice";
const settingsForm = document.createElement("form");
settingsForm.className = "exercise-settings-form";

let alertWindow = document.createElement("p");
alertWindow.style.fontSize = "1.5rem";

const firstExercise = document.createElement("input");
firstExercise.placeholder = "enter exercise";
const secondExercise = document.createElement("input");
secondExercise.placeholder = "enter exercise";
const thirdExercise = document.createElement("input");
thirdExercise.placeholder = "enter exercise (optional)";
const fourthExercise = document.createElement("input");
fourthExercise.placeholder = "enter exercise (optional)";
const fifthExercise = document.createElement("input");
fifthExercise.placeholder = "enter exercise (optional)";
settingsCont.className = "settings";
const breaker = document.createElement("br");
const breaker2 = document.createElement("br");
const breaker3 = document.createElement("br");
const interalLabel = document.createElement("label");
interalLabel.innerHTML = "interval b/w exercises";
const intervalInput = document.createElement("input");
interalLabel.append(breaker, intervalInput);
const exerciseDurationLabel = document.createElement("label");
exerciseDurationLabel.innerHTML = "exercise duration";
const exerciseDurationInput = document.createElement("input");
exerciseDurationLabel.append(breaker2, exerciseDurationInput);
const numberOfRoundsLabel = document.createElement("label");
numberOfRoundsLabel.innerHTML = "number of rounds/sets";
const numberOfRoundsInput = document.createElement("input");
numberOfRoundsLabel.append(breaker3, numberOfRoundsInput);
const settingsButton = document.createElement("button");
settingsButton.className = "done-settings";
settingsButton.innerHTML = "submit";
const thirdContent = document.createElement("h3");
const settingsPage = () => {
  settingsForm.append(
    firstExercise,
    secondExercise,
    thirdExercise,
    fourthExercise,
    fifthExercise,
    interalLabel,
    exerciseDurationLabel,
    numberOfRoundsLabel,
  );
  settingsCont.append(
    settingsHeader,
    thirdContent,
    settingsIntructions,
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
const populate = async () => {
  //   const userId = localStorage.getItem("workoutUserId");
  const userId = "6a68f0d6ca0c4f40594d43a9";
  console.log(userId);
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();

  const user = users.find((user) => user._id === userId);
  console.log(users);
  const { workSettings } = user;
  console.log(workSettings);
  exes[0].value = workSettings.exercise[0] || "";
  exes[1].value = workSettings.exercise[1] || "";
  exes[2].value = workSettings.exercise[2] || "";
  exes[3].value = workSettings.exercise[3] || "";
  exes[4].value = workSettings.exercise[4] || "";
  intervalInput.value = workSettings.interval || "";
  exerciseDurationInput.value = workSettings.exercisesDuration || "";
  numberOfRoundsInput.value = workSettings.numberOfRounds || "";
};

populate();

const editUser = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("workoutUserId");
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
    const workerSettings = {
      exercise: filteredExercise,
      interval: intervalInput.value,
      exercisesDuration: exerciseDurationInput.value,
      numberOfRounds: numberOfRoundsInput.value,
    };
    console.log(users);
    const user = users.find((user) => user._id === userId);

    if (filteredExercise.length < 1) {
      console.log("exercise list is too short. make it at least 2");
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

export { settingsPage };

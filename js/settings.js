import myUrl from "./myUrl.js";
import { timeClocking } from "./genFunc.js";
import { homePage, firstCont } from "./home.js";

const settingsCont = document.createElement("div");
settingsCont.className = "settings";
const innerSettingsElement = document.createElement("section");
const settingsHeader = document.createElement("h3");
settingsHeader.className = "settings-header"
const settingsInstructions = document.createElement("p");
settingsInstructions.innerHTML =
"Please setup your exercise routine.";
settingsInstructions.className = "settings-instructions"
const settingsForm = document.createElement("form");
settingsForm.className = "exercise-settings-form";


let alertWindow = document.createElement("p");
alertWindow.style.fontSize = "1.5rem";


settingsCont.className = "settings";
const breaker = document.createElement("br");
const breaker3 = document.createElement("br");
const intervalLabel = document.createElement("label");
intervalLabel.className = "interval-label"
intervalLabel.innerHTML = "refuel duration:"
const intervalHourInput = document.createElement("input");
intervalHourInput.type = "number"
const intervalMinInput = document.createElement("input");
intervalMinInput.type = "number"
const intervalSecInput = document.createElement("input");
intervalSecInput.type = "number"

intervalHourInput.className = "interval-input";
intervalMinInput.className = "interval-input";
intervalSecInput.className = "interval-input";

const columnElement = document.createElement("span")
columnElement.innerHTML = ":"
columnElement.className = "column-element"
const timerHeaderCont = document.createElement("section")
timerHeaderCont.className = "timer-header-cont"

const hourLabel = document.createElement("label")
const minuteLabel = document.createElement("label")
const secondLabel = document.createElement("label")
hourLabel.innerHTML = "hr"
minuteLabel.innerHTML = "min"
secondLabel.innerHTML = "sec"
// hourLabel.append(breaker, intervalHourInput)
timerHeaderCont.append(hourLabel, minuteLabel, secondLabel)
hourLabel.className = "hour-label"
minuteLabel.className = "minute-label"
secondLabel.className = "second-label"
// minuteLabel.append(intervalMinInput)
// secondLabel.append(intervalSecInput)
intervalLabel.append(breaker, intervalHourInput, columnElement, intervalMinInput, columnElement.cloneNode(true), intervalSecInput);
// intervalLabel.append(hourLabel, columnElement, minuteLabel, columnElement.cloneNode(true), secondLabel);
const exerciseDurationLabel = document.createElement("label");
exerciseDurationLabel.innerHTML = "exercise duration:";
exerciseDurationLabel.className = "duration-label"

const timingMain = document.createElement("fieldset")
const legend2 = document.createElement("legend")
legend2.innerHTML = "set timings"
legend2.className = "select-exercise-legend"
// timingMain.style.backgroundColor = "red"
// timingMain.style.minwidth = "80vw"
timingMain.className = "timing-main"
timingMain.appendChild(legend2)

  const filterForm = document.createElement("form")
  const filterButton = document.createElement("span")
  filterButton.className = "filter-button"
  filterForm.className = "filter-form"
  filterButton.innerHTML = "filter"
  const usersFilter = document.createElement("input")
  usersFilter.placeholder = "search exercise"
filterForm.append(usersFilter)


const exerciseDurationHourInput = document.createElement("input");
exerciseDurationHourInput.type = "number"
const exerciseDurationMinInput = document.createElement("input");
exerciseDurationMinInput.type = "number"
const exerciseDurationSecInput = document.createElement("input");
exerciseDurationSecInput.required = true;
exerciseDurationSecInput.type = "number"
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
numberOfRoundsInput.type = "number"
numberOfRoundsInput.className = "number-of-rounds-input";
numberOfRoundsLabel.append(breaker3, numberOfRoundsInput);
const settingsButton = document.createElement("button");
settingsButton.className = "done-settings";
settingsButton.innerHTML = "submit";
const thirdContent = document.createElement("h3");
const exMain = document.createElement("fieldset")
const legend = document.createElement("legend")
legend.className = "select-exercise-legend"
legend.innerHTML = "select exercises"
exMain.className = "ex-main"

const exercisesContainer = document.createElement("div");
exercisesContainer.className = "exercises-container";
const getExercise = async () => {
  const response = await fetch(`${myUrl}/exercise`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const exercises = await response.json();
  console.log(exercises)
  return exercises;
}


const exerciseList = await getExercise()

console.log(exerciseList)




const addExercise = async (box, checker, array) => {
  const innArray = array.find((item) => item === checker.innerHTML)
  console.log(box)
  // array.length = 0
  if (box.checked === true){
    console.log(innArray)
    console.log("checked")
    if (innArray){
      console.log("inside array")
      return
    }else {
      console.log("not inide array")
      popArray.push(checker.innerHTML)
      console.log(popArray)
      return
    }
  } else {
    console.log("unchecked")
    console.log(checker.innerHTML)
    // array = [...new Set(popArray)]
    const index = popArray.indexOf(checker.innerHTML)
    console.log(index)
    popArray.splice(index, 1)
    console.log(popArray)
    
  }
    }


    let addArray = []
    let popArray = []
    exMain.append(legend)
    exMain.append(exercisesContainer)
    // exMain.insertBefore(exercisesContainer)
    timingMain.append(timerHeaderCont, exerciseDurationLabel, intervalLabel,  numberOfRoundsLabel)
    
    
    intervalHourInput.placeholder = "HH";
    intervalMinInput.placeholder = "MM";
    intervalSecInput.placeholder = "SS";
    // exerciseDurationInput.placeholder = "numbers only";
  numberOfRoundsInput.placeholder = "numbers only";
const settingsPage = () => {
  settingsForm.append(
    // filterForm,
    exMain,
   timingMain
  );
  settingsCont.append(
    filterForm,
    // settingsHeader,
    // thirdContent,
    // settingsInstructions,
    settingsForm,
    settingsButton,
    alertWindow,
  );
  // settingsHeader.innerHTML = "settings";
  return settingsCont;
};


// const userId = "6a6695c18889470e03c937ec";
const userId = localStorage.getItem("workoutUserId");


const userExes = async () => {
   const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();
  return users
}

let users = await userExes()
const user = users.find((user) => user._id === userId);



let creator = exerciseList.map((ex) => {
  const exercise = document.createElement("article")
  exercise.className = "single-exercise"
  // exercise.style.backgroundImage = `url("images/Plank.gif")`

  const exerciseName = document.createElement("p")
  exerciseName.innerHTML = ex.name
  
  const selector = document.createElement("input")
  selector.addEventListener("change", (e) => addExercise(selector, exerciseName, addArray))
  selector.type = "checkbox"
  selector.className = "exercise-selector"
  exercise.append(selector, exerciseName)
  exercise.style.backgroundImage = `url("images/Push up.gif")`


  exercisesContainer.appendChild(exercise)
  return {selector, ex, exercise}
})

usersFilter.addEventListener("input", (e) => {
  e.preventDefault()
  exercisesContainer.replaceChildren()
  let filterate = exerciseList.filter((ex) => ex.name.includes(e.target.value.toLowerCase()))
  console.log(filterate)
  let innerCreator = filterate.map((ex) => {
   console.log(ex)
  const exercise = document.createElement("article")
  exercise.className = "single-exercise"
  // exercise.style.backgroundImage = `url("images/Plank.gif")`

  const exerciseName = document.createElement("p")
  exerciseName.innerHTML = ex.name
  
  const selector = document.createElement("input")
  selector.addEventListener("change", (e) => addExercise(selector, exerciseName, addArray))
  selector.type = "checkbox"
  selector.className = "exercise-selector"
  exercise.append(selector, exerciseName)
  exercise.style.backgroundImage = `url("images/Push up.gif")`
  
  
  exercisesContainer.appendChild(exercise)
  return {selector, ex, exercise}

})
const user = users.find((user) => user._id == userId)
if (user){
  const {workSettings} = user
  const filArray = popArray.map((userEx) =>{
    console.log(innerCreator)
    // find the item in the general exercise list that matches the user's exercise list
   const found = innerCreator.filter((item) => item.ex.name == userEx)
found.map((item) => {
  item.selector.checked = true

})
    // return item.ex.name

   console.log(found)
  //  have it checked
  // found.map((item) => {

  // })
   
  })
}
filterate = exerciseList
})

const populate = async (userId) => {
  creator.map((item) => {
    item.selector.checked = false
  })
  console.log(exerciseList)
  console.log(addArray)

  const user = users.find((user) => user._id === userId);
  console.log(user)
  if (user) {
    const { workSettings } = user;

// console.log(creator)
const filArray = workSettings.exercise.map((userEx) =>{
  // find the item in the general exercise list that matches the user's exercise list
 const found = creator.find((item) => item.ex.name == userEx)
 //  have it checked
 found.selector.checked = true
 
  return found.ex.name
})
console.log(filArray)
popArray = filArray
console.log(popArray)
  intervalHourInput.value = workSettings.interval >= 3600 ? Math.floor(workSettings.interval / 3600) : 0;
  intervalMinInput.value = Math.floor(workSettings.interval % 3600) >= 60 && Math.floor(workSettings.interval % 3600) < (60 * 60) ?  Math.floor(workSettings.interval % 3600 / 60) : 0;
  intervalSecInput.value = workSettings.interval % 3600  % 60  < 60 ? Math.floor(workSettings.interval % 3600 % 60)  : 0;
  
  exerciseDurationHourInput.value =  workSettings.exercisesDuration >= 3600 ? Math.floor(workSettings.exercisesDuration / 3600) : 0;
  exerciseDurationMinInput.value =  Math.floor(workSettings.exercisesDuration % 3600) >= 60 && Math.floor(workSettings.exercisesDuration % 3600) < (60 * 60) ?  Math.floor(workSettings.exercisesDuration % 3600 / 60) : 0;
  exerciseDurationSecInput.value = workSettings.exercisesDuration % 3600  % 60  < 60 ? Math.floor(workSettings.exercisesDuration % 3600 % 60)  : 0;

  numberOfRoundsInput.value = workSettings.numberOfRounds || 1;
  
};
}

populate(userId);

const editUser = async (e) => {
  e.preventDefault()
  alertWindow.innerHTML = "updating..."
  console.log(popArray)

  // console.log(userId)
  // console.log(homePage());
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();
  if (users) {
    const hourInterval = !intervalHourInput.value ? 0 : Number(intervalHourInput.value)
    const minInterval = !intervalMinInput.value ? 0 : Number(intervalMinInput.value)
    const secInterval = !intervalSecInput.value ? 0 : Number(intervalSecInput.value)
    
    const hourDuration = !exerciseDurationHourInput.value ? 0 : Number(exerciseDurationHourInput.value)
    const minDuration = !exerciseDurationMinInput.value ? 0 : Number(exerciseDurationMinInput.value)
    const secDuration = !exerciseDurationMinInput.value ? 0 : Number(exerciseDurationSecInput.value)

    const workerSettings = {
      exercise: popArray,
      interval: (hourInterval * 60 * 60) + (Number(minInterval) * 60) + Number(secInterval) || 0,
      exercisesDuration: (Number(hourDuration) * 60 * 60) + (Number(minDuration) * 60) + Number(secDuration) != 0   ? (Number(hourDuration) * 60 * 60) + (Number(minDuration) * 60) + Number(exerciseDurationSecInput.value) : 20,
      numberOfRounds: numberOfRoundsInput.value || 1,
    };
    console.log(workerSettings.exercisesDuration);
    console.log((hourDuration * 60 * 60) + (Number(minDuration) * 60) + Number(secDuration));
    const user = users.find((user) => user._id === userId);
    
      if (popArray.length < 1 || popArray.length > 5) {
        console.log("exercise list is too short. make it at least 2");
          alertWindow.innerHTML = popArray.length < 1 ?  "enter at least 1 exercise" : popArray.length > 5 ? "you can't select more than five exercises" : "";
        alertWindow.className = "verify-window";
        alertWindow.style.position = "fixed";
        alertWindow.style.top = "40%";
           setTimeout(() => {
          alertWindow.className = "no-verify-window";
        }, 5000);
      } else {
        const respone2 = await fetch(`${myUrl}/workout-users/${localStorage.getItem("workoutUserId")}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workerSettings),
        });
        homePage(userId)
        const reply = await respone2.json();
        // update the home page
        alertWindow.innerHTML = reply;
        alertWindow.className = "verify-window";
        alertWindow.style.position = "fixed";
        alertWindow.style.top = "40%";
        setTimeout(() => {
          alertWindow.className = "no-verify-window";
        }, 3000);
      }
  }
};

settingsButton.addEventListener("click", editUser);

export { settingsPage, populate, addArray };

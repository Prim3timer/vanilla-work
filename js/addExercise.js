import myUrl  from "./myUrl.js"
const exerciseMain = document.createElement("div")
const exerciseHeader = document.createElement("h3")
exerciseHeader.className = "exercise-header"
// exerciseHeader.innerHTML = "Add Exercise"
exerciseMain.appendChild(exerciseHeader)
exerciseMain.className = "add-exercise"

const addForm = document.createElement("form")
addForm.className = "add-exercise-form"
const exerciseName = document.createElement("input")
const caloriesBurned = document.createElement("input")
caloriesBurned.type = "number"
caloriesBurned.placeholder = "Calories burned / 30sec"
exerciseName.type = "text"
exerciseName.placeholder = "Exercise Name"
const addExerciseButton = document.createElement("button")
addExerciseButton.innerHTML = "Add Exercise"
addExerciseButton.className = "add-ex-button"
addExerciseButton.type = "submit"

const listLength = document.createElement("h4")
listLength.className = "exercise-list-length"

const alertWindow = document.createElement("p")
alertWindow.className = "no-verify-window"


addForm.appendChild(exerciseName)
addForm.appendChild(caloriesBurned)
addForm.appendChild(addExerciseButton)
exerciseMain.appendChild(addForm, alertWindow)

const exTable = document.createElement("table")
exTable.className = "exercise-table"
const exTableBody = document.createElement("tbody")
const exHeaderRow = document.createElement("tr")
const nameCell = document.createElement("th")
nameCell.innerHTML = "exercise name"
const caloriesCell = document.createElement("th")
caloriesCell.innerHTML = "calories burned / 30sec"
caloriesCell.colSpan = 2
exHeaderRow.append(nameCell, caloriesCell)



let itemId = ""

const editWindow = document.createElement("form")
editWindow.className = "no-verify-window"
const nameEditLabel = document.createElement("label")
nameEditLabel.innerHTML = "exercise name"
const nameEditInput = document.createElement("input")
const calorieEditInput = document.createElement("input")
const calorieEditLabel = document.createElement("label")
const editButtonContainer = document.createElement("article")
editButtonContainer.className = "verify-button-cont"
const cancelButton = document.createElement("button")
cancelButton.innerHTML = "cancel"
const editButton = document.createElement("button")
editButton.innerHTML = "edit"
editButtonContainer.append(cancelButton, editButton)
calorieEditLabel.innerHTML = "calories"
nameEditLabel.append(nameEditInput)
calorieEditLabel.append(calorieEditInput)

cancelButton.addEventListener("click", (e) => {
  e.preventDefault()
  editWindow.classList.replace("verify-window", "no-verify-window")
})

editWindow.append(nameEditLabel, calorieEditLabel, editButtonContainer)


let verifyWindow = document.createElement("div");
let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this entry?";

let verifyWindowButtonCont = document.createElement("article");
// let alertWindow = document.createElement("p");

verifyWindow.className = "no-verify-window";

verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = `Yes <i class="fa-solid fa-trash"></i>`;
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

exerciseMain.appendChild(verifyWindow);
exerciseMain.appendChild(alertWindow);
exerciseMain.appendChild(editWindow)


const windowCloser = () => {
  verifyWindow.className = "no-verify-window";
}

noButton.addEventListener("click", windowCloser);

const getExercises = async () => {
  const response = await fetch(`${myUrl}/exercise`, {
    method: "GET",
  })
  const data = await response.json()
  console.log(data)
  return data
}


const exerciseList = await getExercises()
console.log(exerciseList)


const editExercise = async () => {
  console.log(itemId);
  
}

const deleteExercise = async () => {
  console.log(itemId)
    const response = await fetch(`${myUrl}/exercise/${itemId}`, {
        method: "DELETE"
      })
      const data = await response.json()
      console.log(data)
     if (response){
       const filterate = exerciseList.filter((exercise) => exercise._id !== itemId)
       populate(filterate)
       verifyWindow.classList.replace("verify-window", "no-verify-window")
           alertWindow.innerHTML = "exercise deleted"
      alertWindow.className = "verify-window"
      setTimeout(() => {
        alertWindow.classList.replace("verify-window", "no-verify-window")
      }, 3000)

     }
    }

    
    const addExercise = async (e) => {
    e.preventDefault(); 
    const name = exerciseName.value.trim()
    const calories = caloriesBurned.value.trim()
    const response = await fetch(`${myUrl}/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name.trim(), calories: calories.trim() })
    })
    console.log(response.status)
    const cookedRes = await response.json()
    if (cookedRes){
      exerciseList.push({name: name.trim(), calories: calories.trim()})
     console.log(name)
  const exRow = document.createElement("tr")
    exRow.style.backgroundColor = `${exerciseList.length % 2 !== 0 ? "white" : "powderblue"}`;
    const exNameCell = document.createElement("td")
    exNameCell.innerHTML = name
    const exCaloriesCell = document.createElement("td")
    exCaloriesCell.innerHTML = calories
    if (response.status === 201) {
      exRow.append(exNameCell, exCaloriesCell)
    }
    listLength.innerHTML = `Total exercises: ${exerciseList.length}`
    exTableBody.appendChild(exRow)
    console.log(cookedRes.status)
    alertWindow.innerHTML = await cookedRes
    alertWindow.className = "verify-window"
    exerciseMain.appendChild(alertWindow)
     
     setTimeout(() => {
      alertWindow.className = "no-verify-window"
     }, 3000)

   }
}

const populate = (list) => {
  
  exTableBody.replaceChildren()
  exTableBody.appendChild(exHeaderRow)
  for (let i = 0; i < list.length; i++) {
    const exRow = document.createElement("tr")
    exRow.style.backgroundColor = `${i % 2 !== 0 ? "white" : "paleturquoise"}`;
    const exNameCell = document.createElement("td")
    exNameCell.innerHTML = list[i].name
    const exCaloriesCell = document.createElement("td")
    const editCell = document.createElement("td")
    editCell.innerHTML = `<i class="fa-solid fa-square-pen"></i>`
    const deleteCell = document.createElement("td")
    deleteCell.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteCell.className = "delete-cell"
    listLength.innerHTML = `Total exercises: ${list.length}`
    editCell.addEventListener("click", () => {
      itemId = list[i]._id
      editWindow.classList.replace("no-verify-window", "verify-window")
      nameEditInput.value = list[i].name
      calorieEditInput.value = list[i].calories
    })

    deleteCell.addEventListener("click", () => {
      verifyWindow.classList.replace("no-verify-window", "verify-window")
      itemId = list[i]._id
    })
      exCaloriesCell.innerHTML = list[i].calories
      exRow.appendChild(exNameCell)
      exRow.appendChild(exCaloriesCell)
      exRow.appendChild(editCell)
      exRow.appendChild(deleteCell)
      exTableBody.appendChild(exRow)
    }
    exerciseMain.appendChild(listLength)
  exTable.appendChild(exTableBody)
  exerciseMain.appendChild(exTable)
  return exerciseMain
}

yesButton.addEventListener("click", deleteExercise)

const filterExerciseList = (e) => {
  const filterate = exerciseList.filter((exercise) => exercise.name.toLowerCase().includes(e.target.value.toLowerCase()))
  populate(filterate)
}

addExerciseButton.addEventListener("click",  (e) => addExercise(e))

const addExercisePage = () => {
  return populate(exerciseList)
}

export {addExercisePage, filterExerciseList}
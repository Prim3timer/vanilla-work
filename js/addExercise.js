import myUrl  from "./myUrl.js"
const exerciseMain = document.createElement("div")
const exerciseHeader = document.createElement("h3")
exerciseHeader.className = "exercise-header"
exerciseHeader.innerHTML = "add exercise"
exerciseMain.appendChild(exerciseHeader)
exerciseMain.className = "add-exercise"

const addForm = document.createElement("form")
addForm.className = "add-exercise-form"
const exerciseName = document.createElement("input")
const caloriesBurned = document.createElement("input")
caloriesBurned.type = "number"
caloriesBurned.placeholder = "Calories burned"
exerciseName.type = "text"
exerciseName.placeholder = "Exercise Name"
const addExerciseButton = document.createElement("button")
addExerciseButton.innerHTML = "Add"
addExerciseButton.type = "submit"

const alertWindow = document.createElement("p")
alertWindow.className = "no-verify-window"

addForm.appendChild(exerciseName)
addForm.appendChild(caloriesBurned)
addForm.appendChild(addExerciseButton)
exerciseMain.appendChild(addForm, alertWindow)



const addExercise = async (e) => {
    e.preventDefault();
    const name = exerciseName.value.trim()
    console.log(name)
    const calories = caloriesBurned.value.trim()
   const response = await fetch(`${myUrl}/exercise`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({ name: name.trim(), calories: calories.trim() })
   })
   const cookedRes = await response.json()
   if (cookedRes){
     alertWindow.innerHTML = await cookedRes
     alertWindow.className = "verify-window"
     console.log(cookedRes)
     setTimeout(() => {
      alertWindow.className = "no-verify-window"
     }, 3000)

   }


}

const populate = async () => {
  const response = await fetch(`${myUrl}/exercise`, {
    method: "GET",
  })
  const data = await response.json()
  console.log(data)
  return data
}


const exerciseList = await populate()
console.log(exerciseList)

const exTable = document.createElement("table")
exTable.className = "exercise-table"
const exTableBody = document.createElement("tbody")
const exHeaderRow = document.createElement("tr")
const nameCell = document.createElement("th")
nameCell.innerHTML = "exercise name"
const caloriesCell = document.createElement("th")
caloriesCell.innerHTML = "calories burned"
exHeaderRow.append(nameCell, caloriesCell)
exTableBody.appendChild(exHeaderRow)
for (let i = 0; i < exerciseList.length; i++) {
  const exRow = document.createElement("tr")
  exRow.style.backgroundColor = `${i % 2 === 0 ? "white" : "palegreen"}`;
  const exNameCell = document.createElement("td")
  exNameCell.innerHTML = exerciseList[i].name
  const exCaloriesCell = document.createElement("td")
  const deleteCell = document.createElement("td")
  deleteCell.innerHTML = "delete"
  deleteCell.className = "delete-cell"
  deleteCell.addEventListener("click", async () => {
    const response = await fetch(`${myUrl}/exercise/${exerciseList[i]._id}`, {
      method: "DELETE"
    })
    const data = await response.json()
    console.log(data)
    // Remove the row from the table
    exRow.remove()
  })
  exCaloriesCell.innerHTML = exerciseList[i].calories
  exRow.appendChild(exNameCell)
  exRow.appendChild(exCaloriesCell)
  exRow.appendChild(deleteCell)
  exTableBody.appendChild(exRow)
}
exTable.appendChild(exTableBody)
exerciseMain.appendChild(exTable)
addExerciseButton.addEventListener("click",  (e) => addExercise(e))

const addExercisePage = () => {
    return exerciseMain
}

export {addExercisePage}
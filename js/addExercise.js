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

addForm.appendChild(exerciseName)
addForm.appendChild(caloriesBurned)
addForm.appendChild(addExerciseButton)
exerciseMain.appendChild(addForm)

const addExercise = async (e) => {
    e.preventDefault();
    const name = exerciseName.value
    console.log(name)
    const calories = caloriesBurned.value
   const response = await fetch(`${myUrl}/exercise`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({ name, calories })
   })
}

addExerciseButton.addEventListener("click",  (e) => addExercise(e))

const addExercisePage = () => {
    return exerciseMain
}

export {addExercisePage}
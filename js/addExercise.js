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

addForm.appendChild(exerciseName)
addForm.appendChild(caloriesBurned)
exerciseMain.appendChild(addForm)

const addExercisePage = () => {
    return exerciseMain
}

export {addExercisePage}
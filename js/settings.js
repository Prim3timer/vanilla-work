const settingsPage = () => {
  const settingsCont = document.createElement("div");
  settingsCont.className = "settings";
  const innerSettingsElement = document.createElement("section");
  const settingsHeader = document.createElement("h3");
  const settingsIntructions = document.createElement("p");
  settingsIntructions.innerHTML =
    "Please populate the input fields with your exercises of choice";
  const settingsForm = document.createElement("form");
  settingsForm.className = "exercise-settings-form";

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
  const settingsButton = document.createElement("button");
  settingsButton.className = "done-settings";
  settingsButton.innerHTML = "submit";
  const thirdContent = document.createElement("h3");
  settingsForm.append(
    thirdContent,
    firstExercise,
    secondExercise,
    thirdExercise,
    fourthExercise,
    fifthExercise,
    settingsButton,
  );
  settingsCont.append(thirdContent, settingsIntructions, settingsForm);
  thirdContent.innerHTML = "settings";
  return settingsCont;
};

export { settingsPage };

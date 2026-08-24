import myUrl from "./myUrl.js";

const changePassword = document.createElement("div");
const changePasswordHeader = document.createElement("h3");
changePasswordHeader.innerHTML = "create password";
changePassword.className = "forgot";
changePassword.append(changePasswordHeader);

const confrimButton = document.createElement("button");
confrimButton.className = "forgot-button";
confrimButton.innerHTML = "confirm";

const username = document.createElement("h4");
// username.style.backgroundColor = "red";

const changeForm = document.createElement("form");
changeForm.append(username);
changeForm.className = "forgot-form";
const passwordLabel = document.createElement("label");
passwordLabel.innerHTML = "new password";
const passwordInput = document.createElement("input");
passwordInput.className = "email-input";

const confirmPasswordLabel = document.createElement("label");
confirmPasswordLabel.innerHTML = "confirm password";
const confirmPasswordInput = document.createElement("input");
confirmPasswordInput.className = "email-input";

// these are the breaks ha.
const passwordBreak = document.createElement("br");
const conformPasswordBreak = document.createElement("br");

passwordLabel.append(passwordBreak, passwordInput);
confirmPasswordLabel.append(conformPasswordBreak, confirmPasswordInput);
changeForm.append(passwordLabel, confirmPasswordLabel);
changePassword.append(changeForm);
changePassword.appendChild(confrimButton);

console.log(username);
const getCred = async (e) => {
  console.log("hiiii");
  // e.preventDefault();
  const verifyUrl = document.location.search;
  const urlParams = new URLSearchParams(verifyUrl);
  const email = urlParams.get("email");
  try {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    console.log(email);
    const foundUser = users.find((user) => user.email === email);
    if (foundUser) {
      username.innerHTML = `username: ${foundUser.username}`;
    }
  } catch (error) {
    console.log(error);
  }
};

const gratherCred = async (e) => {
  e.preventDefault();
  const verifyUrl = document.location.search;
  const urlParams = new URLSearchParams(verifyUrl);
  const email = urlParams.get("email");

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (!password === confirmPassword) {
    console.log("password do not match");
  } else {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    const foundUser = users.find((user) => user.email === email);
    if (foundUser) {
      const response2 = await fetch(
        `${myUrl}/workout-users/user-setting/${foundUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordInput.value,
          }),
        },
      );

      console.log(passwordInput.value);
    }
  }
};

window.addEventListener("load", getCred);
// window.onload = getCred;
confrimButton.addEventListener("click", gratherCred);
const changePage = () => {
  return changePassword;
};

export { changePage };

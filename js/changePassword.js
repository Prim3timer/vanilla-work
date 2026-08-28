import { loginPage } from "./login.js";
import myUrl from "./myUrl.js";
const mainContainer = document.getElementById("main-page")
const changePassword = document.createElement("div");
const changePasswordHeader = document.createElement("h3");
changePasswordHeader.innerHTML = "create password";
changePassword.className = "change-password";
changePassword.append(changePasswordHeader);

const confrimButton = document.createElement("button");
confrimButton.className = "forgot-button";
confrimButton.innerHTML = "confirm";
const alertMessage = document.createElement("h3")
changePassword.append(alertMessage)
// alertMessage.innerHTML = "alert-message"
// usernameElement.style.backgroundColor = "red";

const changeForm = document.createElement("form");
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

const getCred = async (e) => {
  console.log("hiiii");
  // e.preventDefault();
  const url = new URL(window.location.href)
  url.searchParams.delete("email")
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

const gratherCred = async (e, email) => {
  e.preventDefault();
//   const verifyUrl = document.location.search;
//   const urlParams = new URLSearchParams(verifyUrl);
//   const email = urlParams.get("email");
// console.log(email)
// console.log(verifyUrl)
//     const url = new URL(window.location.href)
//     console.log(url.searchParams)
//   url.searchParams.delete("email")

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    alertMessage.innerHTML = "passwords do not match"
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
        `${myUrl}/workout-users/reset-password/${foundUser._id}`,
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
      //    const url = new URL(window.location.href);
      // url.searchParams.set("prompt", "your password has been updated");
      const message = "your password has been updated"
      //  window.history.replaceState({}, "", url);
          if (mainContainer.children.length > 0) {
            mainContainer.firstElementChild.replaceWith(loginPage(message));
            return;
          } else {
            mainContainer.appendChild(loginPage(message));
          }

      console.log(passwordInput.value);
    }
  }
};

window.addEventListener("load", getCred);
const changePage = (username, email) => {
  confrimButton.addEventListener("click", (e) => gratherCred(e, email));
  changePasswordHeader.innerHTML = `${username} create new password`;
  return changePassword;
};

export { changePage };

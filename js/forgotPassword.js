import myUrl from "./myUrl.js";
import { changePage } from "./changePassword.js";

const mainContainer = document.getElementById("main-page");
const forgotMain = document.createElement("div");
forgotMain.id = "forgot-main";
const forgotMainHeader = document.createElement("h3");
forgotMainHeader.className = "forgot-main-hear";
forgotMainHeader.innerHTML = "forgot password";
forgotMain.append(forgotMainHeader);
const forgotForm = document.createElement("form");
forgotForm.className = "forgot";
const emailLabel = document.createElement("label");
emailLabel.innerHTML = "What is your email address?";
const emailValue = document.createElement("input");
emailValue.className = "email-input";
const forgotButton = document.createElement("button");
forgotButton.innerHTML = "forgot";
forgotButton.className = "forgot-button";

// these are the breaks ha.
const emailBreak = document.createElement("br");

emailLabel.append(emailBreak, emailValue);
forgotForm.append(emailLabel);
forgotMain.append(forgotForm, forgotButton);

const changePageCont = [changePage()];

function ElementCatcher(pages, mainContainer) {
  this.shower = async function (e) {
    e.preventDefault();
    const result = await pages;
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    const foundUser = users.find((user) => user.email === emailValue.value);
    console.log(foundUser);
    if (foundUser) {
      const url = new URL(window.location.href);
      url.searchParams.set("email", emailValue.value);
      window.history.pushState({}, "", url);
    }
    const oneElement = result.map((content) => {
      console.log(this.innerHTML, content.className)
      if (this.innerHTML == content.className) {
        if (mainContainer.children.length > 0) {
          mainContainer.firstElementChild.replaceWith(content);
          return;
        } else {
          mainContainer.appendChild(content);
          return;
        }
      }
      return pages;
    });
  };
}

const instanceer = new ElementCatcher(
  changePageCont,
  mainContainer,
  // emailValue.value,
);

const addEmail = async () => {
  console.log(emailValue.value);
  const email = emailValue.value.trim().toLocaleLowerCase();
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const users = await response.json();
  const foundUser = users.find((user) => user.email === email);
  if (foundUser) {
  } else {
    console.log("the email entered does not match any in our database");
  }
  console.log(foundUser);
};

forgotButton.addEventListener("click", instanceer.shower);

const forgotPage = () => {
  return forgotMain;
};

export { forgotPage, instanceer };

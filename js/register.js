import myUrl from "./myUrl.js";
const signUp = document.createElement("div");

signUp.className = "register";
const linker = document.createElement("p");
const signUpHeader = document.createElement("h3");
const regForm = document.createElement("form");
const usernameLabel = document.createElement("label");
usernameLabel.innerHTML = "username";
const emailLabel = document.createElement("label");
emailLabel.innerHTML = "email";
const passwordLabel = document.createElement("label");
passwordLabel.innerHTML = "password";
const confirmPasswordLabel = document.createElement("label");
confirmPasswordLabel.innerHTML = "confirm password";
const usernameBreak = document.createElement("br");
const emailBreak = document.createElement("br");
const passwordBreak = document.createElement("br");
const confirmPasswordBreak = document.createElement("br");

const userNameInput = document.createElement("input");
const emailInput = document.createElement("input");
const passwordInput = document.createElement("input");
const confirmPasswordInput = document.createElement("input");

const regbutton = document.createElement("button");
regbutton.className = "sign-up-anchor";
regbutton.innerHTML = "submit";
usernameLabel.append(usernameBreak, userNameInput);
emailLabel.append(emailBreak, emailInput);
passwordLabel.append(passwordBreak, passwordInput);
confirmPasswordLabel.append(confirmPasswordBreak, confirmPasswordInput);
regForm.append(usernameLabel, emailLabel, passwordLabel, confirmPasswordLabel);
regForm.className = "reg-form";
signUpHeader.innerHTML = "sign up";
signUp.appendChild(signUpHeader);
signUp.appendChild(linker);
signUp.append(regForm, regbutton);

const serviceId = "service_rjtqd2f";
const biz = "aerobics guide";
const templateId = "template_cvnsvfd";
const publicKey = "2mxlvdK-Ge0PIlmNb";

const trimmedUsername = userNameInput.value.trim();
const trimmedPassword = passwordInput.value.trim();
const trimmedEmail = emailInput.value.trim().toLowerCase();

const rightNow = new Date();
const now = Date.now();

// let userDets = {};
const createUserDets = async () => {
  const userDets = {
    username: userNameInput.value.trim(),
    email: emailInput.value.trim().toLowerCase(),
    password: passwordInput.value.trim(),
    joined: rightNow,
    workSettings: {},
  };
  console.log(userDets);
  try {
    const templateParams = {
      name: userNameInput.value.trim(),
      email: emailInput.value.trim().toLowerCase(),
      biz,
      link: `https://prim3timer.github.io/vanilla-work?email=${emailInput.value.trim().toLowerCase()}&elapsed=${now}`,
      // link: `http://localhost:5500/index.html?email=${emailInput.value.trim().toLowerCase()}&elapsed=${now}`,
    };

    const mailSent = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey,
    );

    console.log(userDets);
    if (passwordInput.value === confirmPasswordInput.value) {
      linker.innerHTML = `A link has been sent to "${emailInput.value.trim().toLowerCase()}". Head over there to verify your email`;
      const response = await fetch(`${myUrl}/workout-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDets),
      });
      console.log(await response);
    } else {
      console.log("password do not match");
    }
  } catch (error) {
    console.log(error.message);
  }
};

regbutton.addEventListener("click", createUserDets);

const register = () => {
  return signUp;
};

export { register };

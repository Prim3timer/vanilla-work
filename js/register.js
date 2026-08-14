import myUrl from "./myUrl.js";
const signUp = document.createElement("div");
signUp.className = "register";
const signUpHeader = document.createElement("h3");
const linker = document.createElement("linker");
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
signUp.append(regForm, regbutton);

const serviceId = "service_d1lfnf9";
const biz = "aerobics guide";
const templateId = "template_2ho80e4";
const publicKey = "f5fHgbJA_Fp-FHsdN";

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
      link: `http://${window.location.host}/index.html?email=${emailInput.value.trim().toLowerCase()}&elapsed=${now}`,
    };

    const mailSent = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey,
    );

    console.log(userDets);
    if (passwordInput.value === confirmPasswordInput.value) {
      linker.innerHTML = `A link has been sent to ${trimmedEmail}. Head over there to verify your email`;
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

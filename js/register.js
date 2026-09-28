import myUrl from "./myUrl.js";
import { showHide } from "./genFunc.js";
const signUp = document.createElement("div");

signUp.className = "register";
const linker = document.createElement("p");
linker.className = "register-prompt"
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
confirmPasswordInput.className = "confirm-password-input"
const loginQuery = document.createElement("p")
loginQuery.innerHTML  = "already have an account?"
const loginLink = document.createElement("a")
loginLink.innerHTML = "login"

const regbutton = document.createElement("button");
regbutton.className = "sign-up-anchor";
regbutton.innerHTML = "submit";
usernameLabel.append(usernameBreak, userNameInput);
emailLabel.append(emailBreak, emailInput);
passwordLabel.append(passwordBreak, passwordInput);
confirmPasswordLabel.append(confirmPasswordBreak, confirmPasswordInput);
regForm.className = "reg-form";
signUpHeader.innerHTML = "sign up";
signUp.appendChild(signUpHeader);
// signUp.appendChild(linker);
loginLink.id = "login"
loginLink.href = ""

const passwordVisibilityLabel = document.createElement("label")
passwordVisibilityLabel.className = "reg-show-password-label"
passwordVisibilityLabel.innerHTML = "show password:"
const passwordVisiblityInput = document.createElement("input")
passwordVisibilityLabel.append(passwordVisiblityInput)
passwordVisiblityInput.type = "checkbox"
// passwordVisiblityInput.addEventListener("change", () => showHide(passwordInput))
passwordVisiblityInput.className = "reg-show-password"
regForm.append(usernameLabel, emailLabel, passwordLabel, confirmPasswordLabel);
signUp.append(regForm, regbutton, loginQuery, loginLink);

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
  linker.classList.replace("no-register-prompt", "register-prompt")
  linker.innerHTML = "processing...";
  const userDets = {
    username: userNameInput.value.trim(),
    email: emailInput.value.trim().toLowerCase(),
    password: passwordInput.value.trim(),
    joined: rightNow,
    workSettings: {},
  };
    try {
    const templateParams = {
      name: userNameInput.value.trim(),
      email: emailInput.value.trim().toLowerCase(),
      biz,
      link: `https://prim3timer.github.io/vanilla-work?email=${emailInput.value.trim().toLowerCase()}&elapsed=${now}`,
      // link: `http://${window.location.host}/index.html?email=${emailInput.value.trim().toLowerCase()}&elapsed=${now}`,
    };

    const userDataBase = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  

  const users = await userDataBase.json()
  console.log(trimmedEmail)
  console.log(emailInput.value)
  console.log(users)


  signUp.insertBefore(linker, signUpHeader);
  if (passwordInput.value !== confirmPasswordInput.value) {
     linker.innerHTML = `passwords do not match`
  setTimeout(()=> {
    linker.classList.replace("register-prompt", "no-register-prompt")
  }, 3000)
   
      
} else {
       const response = await fetch(`${myUrl}/workout-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDets),
    });
    console.log(response)
    if (!response.ok){
      if (response.status == 409){
        //  const errorData = await response.json()
      // console.log(errorData)
      // linker.innerHTML = `${errorData.message} || something went wrong`
      linker.innerHTML = `duplicate email`
      // throw new Error("something went wrong");
      setTimeout(()=> {
      linker.classList.replace("register-prompt", "no-register-prompt")
      }, 3000)
    
 
    } else if (response.status == 400){
      linker.innerHTML = "all fields are required"
      setTimeout(()=> {
      linker.classList.replace("register-prompt", "no-register-prompt")
      }, 3000)
    }
      throw new Error("server error: ", response.message)
    }
    else {
               const mailSent = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey,
    );
    linker.innerHTML = `A link has been sent to "${emailInput.value.trim().toLowerCase()}". Head over there to verify your email`;
    setTimeout(()=> {
    linker.classList.replace("register-prompt", "no-register-prompt")
    }, 3000)
    console.log(userDets);
    }
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

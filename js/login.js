const loginMain = document.createElement("div");
loginMain.className = "login";
const loginHeader = document.createElement("h3");
loginHeader.innerHTML = "login";
loginMain.append(loginHeader);

const url = window.location.href
const urlParams = new URLSearchParams(url)
const message = urlParams.get("prompt") || ""
console.log(message)

const loginForm = document.createElement("form");
loginForm.className = "login-form";
const usernameLabel = document.createElement("label");
const usernameLabelBr = document.createElement("br");
const usernameInput = document.createElement("input");
usernameLabel.append(usernameLabelBr, usernameInput);
usernameLabel.innerHTML = "Username";
const passwordLabel = document.createElement("label");
passwordLabel.innerHTML = "Password";
const passwordInput = document.createElement("input");
const passwordLabelBr = document.createElement("br");
passwordLabel.append(passwordLabelBr, passwordInput);
usernameInput.type = "text";
usernameInput.name = "username";
usernameInput.id = "username";
usernameInput.placeholder = "Enter your username";
passwordInput.type = "password";
passwordInput.name = "password";
passwordInput.id = "password";
passwordInput.placeholder = "Enter your password";

const submitButton = document.createElement("button");
submitButton.className = "sign-up-anchor";
submitButton.innerHTML = "submit"

const loginLinks = document.createElement("section");
loginLinks.className = "login-links";
const forgotPasswordLink = document.createElement("a");
forgotPasswordLink.className = "forgot-password";
forgotPasswordLink.id = "forgot-password"
forgotPasswordLink.innerHTML = "forgot password";
forgotPasswordLink.href = "";
loginLinks.append(forgotPasswordLink);
const signUpLink = document.createElement("a");
signUpLink.className = "reg-link";
signUpLink.href = "";
signUpLink.innerHTML = "create account";
const needAnaccount = document.createElement("p");
needAnaccount.innerHTML = "need an account?";
loginLinks.append(forgotPasswordLink, needAnaccount, signUpLink);

loginForm.append(usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton,);


loginMain.append(loginForm,  loginLinks);

const loginPage = () => {
    return loginMain;
} 

export { loginPage }
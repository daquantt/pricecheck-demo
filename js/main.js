const navButtons = document.querySelector("#nav-buttons");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const userDisplay = navButtons.children[0];
const registerMsg = document.querySelector("#register-msg");
const loginMsg = document.querySelector("#login-msg");

const users = [
  { username: "Joe", password: "Joe123" },
  { username: "Pam", password: "Pam123" },
];

const products = [];

let loggedInUser;

const login = () => {};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#loginUsername");
  const password = document.querySelector("#password");
  const loginSubmitBtn = document.querySelector("#loginSubmitBtn");
  const userIndex = users.findIndex((user) => user.username === username.value);

  if (userIndex >= 0 && password.value === users[userIndex].password) {
    loggedInUser = username.value;
    //display text
    userDisplay.innerText = `User: ${loggedInUser}`;
    loginMsg.innerText = `Login Successful! Welcome ${loggedInUser}`;
    //hide other buttons
    loginSubmitBtn.classList.remove("d-none");
    loginSubmitBtn.classList.add("d-none");
    registerBtn.classList.remove("d-none");
    registerBtn.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    //show logout button
    logoutBtn.classList.remove("d-none");
  } else {
    loginMsg.innerText = "Login Unsuccessful! Try Again...";
  }

  loginForm.reset();
});

const logout = () => {
  //clear msgs and user
  loggedInUser = "";
  userDisplay.innerText = "";
  loginMsg.innerText = "";
  registerMsg.innerText = "";
  //show buttons
  loginBtn.classList.remove("d-none");
  registerBtn.classList.remove("d-none");
  loginSubmitBtn.classList.remove("d-none");
  registerSubmitBtn.classList.remove("d-none");
  //hide buttons
  logoutBtn.classList.add("d-none");
};

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#registerUsername");
  let password = `${username.value}123`;
  const registerSubmitBtn = document.querySelector("#registerSubmitBtn");

  if (username.value.length < 10 && username.value !== "") {
    users.push({ username: username.value, password: password });
    registerMsg.innerText = "Thank you for registering! Please proceed to log in.";
  } else {
    registerMsg.innerText = "Invalid input!";
    username.focus();
  }

  registerForm.reset();

  closeButton = document.querySelector("#registerModal .btn-close");
  closeButton.addEventListener("click", () => {
    registerMsg.innerText = "";
  });
});

logoutBtn.addEventListener("click", logout);

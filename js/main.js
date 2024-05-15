const navButtons = document.querySelector("#nav-buttons");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const userDisplay = navButtons.children[0];
const registerMsg = document.querySelector("#register-msg");
const loginMsg = document.querySelector("#login-msg");
const searchForm = document.querySelector("#search-form");
const results = document.querySelector("#results");
const inputForm = document.querySelector("#inputForm");
const scores = document.querySelector("#scores");

const users = [
  { username: "Joe", password: "Joe123", joined: "2024-05-01", points: 5 },
  { username: "Pam", password: "Pam123", joined: "2024-05-10", points: 20 },
  { username: "Tom", password: "Tom123", joined: "2024-05-11", points: 40 },
];

const products = [
  { product: "Milk", date: "2024-05-01", price: 3.99, vendor: "Save On Foods", user: "Joe", entered: "2024-05-10" },
  { product: "Eggs", date: "2024-04-25", price: 6.49, vendor: "Co-op", user: "Joe", entered: "2024-05-10" },
  { product: "Bread", date: "2023-12-15", price: 2.79, vendor: "Walmart", user: "Joe", entered: "2024-05-10" },
];

let loggedInUser;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#loginUsername");
  const password = document.querySelector("#password");
  const loginSubmitBtn = document.querySelector("#loginSubmitBtn");
  const userIndex = users.findIndex((user) => user.username === username.value);

  if (userIndex >= 0 && password.value === users[userIndex].password) {
    loggedInUser = username.value;
    //display text
    loginMsg.innerText = `Login Successful! Welcome ${loggedInUser}`;
    loginSubmitBtn.classList.remove("d-none");
    loginSubmitBtn.classList.add("d-none");
  } else {
    loginMsg.innerText = "Login Unsuccessful! Try Again...";
  }

  displayHeaderBtns(loggedInUser);
  loginForm.reset();
});

const logout = () => {
  //clear msgs and user
  loggedInUser = "";
  userDisplay.innerText = "";
  loginMsg.innerText = "";
  registerMsg.innerText = "";
  //show buttons
  loginSubmitBtn.classList.remove("d-none");
  registerSubmitBtn.classList.remove("d-none");

  displayHeaderBtns(loggedInUser);
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

const showProducts = () => {
  results.innerHTML = "";
  let count = 1;
  products.forEach((product) => {
    results.innerHTML += `
      <tr>
        <td scope="row">${count}</td>
        <td>${product.date}</td>
        <td>${product.product}</td>
        <td>${Number(product.price).toFixed(2)}</td>
        <td>${product.vendor}</td>
        <td>${product.user}: ${product.entered}</td>
      </tr>
    `;
    count++;
  });
};

const showUsers = () => {
  let sortedUsers = users.sort((a, b) => b.points - a.points);
  scores.innerHTML = "";
  let count = 1;
  sortedUsers.forEach((user) => {
    scores.innerHTML += `
      <tr>
        <td scope="row">${count}</td>
        <td>${user.username}</td>
        <td>${user.points}</td>
        <td>${user.joined}</td>
      </tr>
    `;
    count++;
  });
};

const filterItems = (filterValue) => {
  //case insensitive search(compare lower case values)
  let lowerCaseFilterValue = filterValue.toLowerCase();

  results.innerHTML = "";
  let count = 1;

  products.forEach((prod) => {
    let productDesc = prod.product.toLowerCase();

    if (productDesc.includes(lowerCaseFilterValue)) {
      //lowerCaseFilterValue is in the product description
      //loop through using foreach
      results.innerHTML += `
        <tr>
          <td scope="row">${count}</td>
          <td>${prod.date}</td>
          <td>${prod.product}</td>
          <td>${Number(prod.price).toFixed(2)}</td>
          <td>${prod.vendor}</td>
          <td>${prod.user}: ${prod.entered}</td>
        </tr>
      `;
      count++;
    }
  });
};

const displayHeaderBtns = (loggedInUser) => {
  if (!loggedInUser) {
    //show buttons
    loginBtn.classList.remove("d-none");
    registerBtn.classList.remove("d-none");
    loginSubmitBtn.classList.remove("d-none");
    registerSubmitBtn.classList.remove("d-none");
    //hide buttons
    logoutBtn.classList.add("d-none");
  } else {
    //f user is logged in, hide buttons
    userDisplay.innerText = `User: ${loggedInUser}`;
    registerBtn.classList.remove("d-none");
    registerBtn.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    //show logout button
    logoutBtn.classList.remove("d-none");
  }
};

// Create products
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const productDate = event.target.elements["product-date"];
  const productDesc = event.target.elements["product-desc"];
  const productPrice = event.target.elements["product-price"];
  const productVendor = event.target.elements["product-vendor"];
  const enteredBy = loggedInUser ? loggedInUser : "Guest";
  const inputMsg = document.querySelector("#input-msg");

  products.push({
    date: productDate.value,
    product: productDesc.value,
    price: productPrice.value,
    vendor: productVendor.value,
    user: enteredBy,
    entered: new Date().toJSON().slice(0, 10),
  });

  inputMsg.innerText = "Product Uploaded!";
  setTimeout(() => {
    inputMsg.innerText = "";
  }, 3000);

  inputForm.reset();
  showProducts();
});

// get search form value and call the function filterItems
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //get the value from the user
  let filterValue = event.target.elements["search"].value;

  filterItems(filterValue);
});

logoutBtn.addEventListener("click", logout);

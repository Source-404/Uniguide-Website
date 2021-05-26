const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const nameUp = document.getElementById("sign-up-name");
const emailUp = document.getElementById("sign-up-email");
const passUp = document.getElementById("sign-up-password");
const formUp = document.querySelector(".sign-up-form");

formUp.onSubmit = function (e) {
  e.preventDefault();
  // console.log(emailUp.value);
};

const buttonUp = document.getElementById("button-signup");

buttonUp.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("i got clicked");
  console.log(nameUp.value);

  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      name: nameUp.value,
      email: emailUp.value,
      password: passUp.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response, token) => response.json())
    .then((json) => console.log(json));
  formUp.reset();
});

const emailIn = document.getElementById("sign-in-name");
const passIn = document.getElementById("sign-in-password");
const formIn = document.querySelector(".sign-in-form");

const buttonIn = document.getElementById("button-login");

var loggedUser;
buttonIn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("login got clicked");
  console.log(passIn.value);

  try {
    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailIn.value,
        password: passIn.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    loggedUser = data;

    window.location.href = "/gallery";
  } catch (e) {
    console.log("something went wrong");
  }
});

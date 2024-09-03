const root = document.getElementById("root").addEventListener("submit", data);

const user = document.getElementById("user");
const email = document.getElementById("email");

function data() {
    const paragName = document.createElement("p");
    paragName.textContent = user.value;

    const paragEmail = document.createElement("p");
    paragEmail.textContent = email.value;

    root.appendChild(paragName, paragEmail);
}
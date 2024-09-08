import { validarEmail, validarName } from "./validation";

document.addEventListener("DOMContentLoaded", fetchData);

const form = document.getElementById("form");
const userList = document.getElementById("dados");

form.addEventListener("submit", insertData);

// Envia dados para o Backend
async function insertData(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
        name: formData.get("user"),
        email: formData.get("email")
    };

    try {
        switch (validarEmail(userData.email) || validarName(userData.name)) {
            case 1:
                throw new Error("Email inválido");
            case 2:
                throw new Error("Nome inválido");
            default:
                break;
        }

        const response = await fetch("http://0.0.0.0:3030", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        addUserList(await response.json());
    } catch (error) {
        console.error("Erro ao enviar dados: ", error.message);
    }

    setTimeout(() => {
        location.reload();
    }, 100);
}

// Adiciona usuários à lista
function addUserList(user) {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;

    userList.appendChild(li);
}

// Buscar e exibir dados
async function fetchData() {
    try {
        const response = await fetch("http://0.0.0.0:3030/user");
        const users = await response.json();

        users.forEach(user => addUserList(user));
    } catch (error) {
        console.error("Error ao buscar usuários: ", error.message);
    }
}

async function deleteData(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
        name: formData.get("user"),
        email: formData.get("email")
    };

    try {
        const response = await fetch("http://0.0.0.0:3030", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        addUserList(await response.json());
    } catch (error) {
        console.error("Erro ao enviar dados: ", error.message);
    }

    setTimeout(() => {
        location.reload();
    }, 100);
}
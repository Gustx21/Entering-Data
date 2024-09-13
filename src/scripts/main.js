document.addEventListener("DOMContentLoaded", fetchData);

const form = document.getElementById("form-principal");
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
        await fetch("http://localhost:3030", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
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
        const response = await fetch("http://localhost:3030/user");
        const users = await response.json();

        users.forEach(user => addUserList(user));
    } catch (error) {
        console.error("Error ao buscar usuários: ", error.message);
    }
}

// Remover dados
async function deleteData() {
    try {
        const id = document;
        
        await fetch(`http://localhost:3030/user/${id}`, {
            method: "DELETE"
        });

        setTimeout(() => {
            location.reload();
        }, 100);
    } catch (error) {
        console.error("Erro ao remover dados: ", error.message);
    }
}
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
        console.error(error.message);
    }

    setTimeout(() => {
        location.reload();
    }, 100);
}

// Adiciona usuários à lista
async function addUserList(user) {
    
    const card = document.createElement("div");
    
    const h3 = document.createElement("h3");
    h3.textContent = `Oi, eu sou ${user.name}!`;
    
    const content = document.createElement("p");
    const posts =  await fetchPosts(user.id);
    posts.forEach(post => content.innerText = post.content);

    const contato = document.createElement("p");
    contato.innerText = user.email;

    card.append(h3, content, contato);

    userList.appendChild(card);
}

// Buscar e exibir dados
async function fetchData() {
    try {
        const response = await fetch("http://localhost:3030/user");
        const users = await response.json();

        users.forEach(user => addUserList(user));
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchPosts(id) {
    try {
        const response = await fetch(`http://localhost:3030/user/${id}/posts`);
        const posts = await response.json();

        return posts;
    } catch (error) {
        console.error(error.message);
    }
}

// Remover dados
async function deleteData(id) {
    try {
        const id = document;
        
        await fetch(`http://localhost:3030/user/${id}`, {
            method: "DELETE"
        });

        setTimeout(() => {
            location.reload();
        }, 100);
    } catch (error) {
        console.error(error.message);
    }
}
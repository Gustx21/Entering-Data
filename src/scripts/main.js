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
        email: formData.get("email"),
        address: addressData()
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
    const posts =  user.posts;
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
        console.error(error.message);
    }
}

document.getElementById("CEP").addEventListener("keypress", addressData);

async function addressData() {
    let endereco = new Object;
    
    // Dados de endereço do usuário
    const cep = document.getElementById("CEP");
    const rua = document.getElementById("rua");
    const complemento = document.getElementById("complemento");
    const cidade = document.getElementById("cidade");
    const numero = document.getElementById("res");
    const bairro = document.getElementById("bairro");
    const uf = document.getElementById("UF");

    try {
        const CEP = await fetch(`https://viacep.com.br/ws/${cep.value}/json`);
        const data = await CEP.json();
        
        rua.value = data.logradouro;
        cidade.value = data.localidade;
        bairro.value = data.bairro;
        uf.value = data.uf;
        
        endereco = {
            CEP: data.cep,
            state: data.uf,
            city: data.localidade,
            Bairro: data.bairro,
            Rua: data.logradouro,
            Numero: numero.value,
            Complemento: complemento.value
        };
    } catch (error) {
        console.log(error);

        endereco = {
            CEP: cep.value,
            UF: uf.value,
            Cidade: cidade.value,
            Bairro: bairro.value,
            Rua: rua.value,
            Numero: numero.value,
            Complemento: complemento.value
        };
    }

    return endereco;
}
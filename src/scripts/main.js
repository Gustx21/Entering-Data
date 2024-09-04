import { insert, read, update, remove } from "./prisma.js";

document.getElementById("btn").addEventListener("submit", insertData);

function insertData(event) {
    event.preventDefault();

    const name = document.getElementById("user").value;
    const email = document.getElementById("email").value;

    insert(name, email);
}

document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
    const divDados = document.getElementById("dados"); 
    const dados = await read();
    console.log(dados);

    const paragName = document.createElement("p");
    paragName.innerHTML = dados;

    divDados.appendChild(paragName);
}

function updateData(id, requisit) {
    update(id, requisit);
    
}

function removeData(id) {
    remove(id);
}
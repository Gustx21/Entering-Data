import { insert, read, update, remove, readPosts } from "../scripts/prisma.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5700"
}));

app.get("/user", async (_, response) => {
    try {
        const content = await read();
        
        if (!content) {
            throw new Error("Erro na leitura do dados");
        }
        
        response.status(200).json(content);
    } catch (error) {
        const statusCode = error.status || 404;
        response.status(statusCode).json(`Erro na leitura de dados do Usuário: ${error.message}`);
    }
});

app.get("/user/:id/posts", async (request, response) => {
    try {
        const posts = await readPosts(request.params.id);
        
        if (!posts) {
            throw new Error("Erro na leitura do dados");
        }
        
        response.status(200).json(posts);
    } catch (error) {
        const statusCode = error.status || 404;
        response.status(statusCode).json(`Erro na leitura dos Posts: ${error.message}`);
        
    }
});

app.post("/", async (request, response) => {
    try {
        const { name, email } = request.body;
    
        if (!name || !email) {
            throw {
                status: 400,
                message: "Nome e Email são obrigatórios"
            };
        }

        await insert(name, email);
    
        response.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
        const statusCode = error.status || 400;
        response.status(statusCode).json(`Erro na inserção dos dados ao Banco: ${error.message}`);
    }
});

app.put("/user/:id/:name/:email", (request, response) => {
    try {
        const id = request.params.id;
        const name = request.params.name;
        const email =  request.params.email;

        if (!name || !email) {
            throw new Error("Nome ou Email são obrigatórios");
        }
    
        const dados = name || email;

        update(id, dados);
    
        response.status(214).json({ message: "Usuário alterado com sucesso" });
    } catch (error) {
        const statusCode = error.status;
        response.status(statusCode).json(error.message);
    }
});

app.delete("/user/:id", (request, response) => {
    try {
        const id = request.params.id;

        if (!id || isNaN(id)) {
            throw new Error("Identificador inválido");
        }

        remove(id);
        
        response.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        const statusCode = error.status;
        response.status(statusCode).json(error.message);
    }
});

app.listen({ 
    port: 3030,
    host: "localhost" 
});
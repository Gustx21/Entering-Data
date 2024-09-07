import { insert, read, update, remove } from "./prisma.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"   
}));

app.post("/", (req, res) => {
    try {
        const { name, email } = req.body;
    
        if (!name || !email) {
            throw {
                status: 400,
                message: "Nome e Email são obrigatórios"
            };
        }

        insert(name, email);
    
        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
        const statusCode = error.status || 400;
        res.status(statusCode).send(error.message);
    }
});

app.get("/user", async (_, res) => {
    try {
        const content = await read();

        if (!content) {
            throw new Error("Erro na leitura do dados");
        }

        res.status(200).json(content);
    } catch (error) {
        const statusCode = error.status || 401;
        res.status(statusCode).send(error.message);
    }
});

app.put("/user/:id/:name/:email", (req, res) => {
    try {
        const name = req.params.name;
        const email =  req.params.email;

        if (!name || !email) {
            throw new Error("Nome ou Email são obrigatórios");
        }
    
        const dados = name || email;

        update(req.params.id, dados);
    
        res.status(214).json({ message: "Usuário alterado com sucesso" });
    } catch (error) {
        const statusCode = error.status;
        res.status(statusCode).send(error.message);
    }
});

app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(id)) {
            throw new Error("Identificador inválido");
        }

        remove(id);
        
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        const statusCode = error.status;
        res.status(statusCode).send(error.message);
    }
});

app.listen(3030);
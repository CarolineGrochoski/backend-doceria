import { fastify } from 'fastify';
import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';
const { PORT } = process.env; 

console.log('Variaveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get('/', async (request, reply)=> {
return { message: 'API server - Gestor de doceria' };
});

const database = new DatabaseMYSQL();

server.post("/doceria", async (request, reply) => {
const { Nome, description, price } = request.body;
await database.create({
Nome,
description,
price
});
console.log(await database.list());
return reply.status(201).send();
})

server.get("/doceria", async (request) => {
const search = request.query.search;
console.log(search);
const doceria = await database.list(search);
return doceria
})

server.put("/doceria/:id", async (request, reply) => { 

const doceriaId = request.params.id;
const { Nome, description, price } = request.body;

const doceria = await database.update(doceriaId, {
Nome,
description,
price,
});
return reply.status(204).send();
})

server.delete("/doceria/:id", async (request, reply) => {
const doceriaId = request.params.id;
await database.delete(doceriaId);
return reply.status(204).send();
})

server.listen({port:PORT}, (err, address)=> {
if (err) {
console.error(err);
process.exit(1);
}
console.log(`Servidor rodando em ${address}`);
});
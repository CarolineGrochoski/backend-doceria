import { sql } from "./db.js";


const createTableQuery = `
CREATE TABLE IF NOT EXISTS doceria (
id VARCHAR(255) PRIMARY KEY,
Nome VARCHAR(255),
description TEXT,
price INT
);
`;


sql.query(createTableQuery)
.then(() => {
console.log("Tabela 'Doceria' criada ou ja existente com sucesso no MySQL");
})
.catch((err) => {
    console.error("Erro ao criar a tabela no MySQL:");
    console.error(err.message);
});
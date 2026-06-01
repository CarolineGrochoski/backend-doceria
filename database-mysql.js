import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL {

    async list(search) {
        let doceria;

        if (search) {

            [doceria] = await sql.execute(
                'SELECT * FROM doceria WHERE title LIKE ?',
                [`%${search}%`]
            );
        } else {
            [doceria] = await sql.execute('SELECT * FROM doceria');
        }

        return doceria;
    }

    async create(doceria) {
        const doceriaId = randomUUID();
        const { Nome, description, price } = doceria;

        await sql.execute(
            'INSERT INTO doceria (id, Nome, description, price) VALUES (?, ?, ?, ?)',
            [doceriaId, Nome, description, price]
        );
    }

    async update(id, doceria) {
        const { Nome, description, price } = doceria;
        await sql.execute(
            'UPDATE doceria SET Nome = ?, description = ?, price = ? WHERE id = ?',
            [Nome, description, price, id]
        );
    }


    async delete(id) {
        await sql.execute('DELETE FROM doceria WHERE id = ?', [id]);
    }
}

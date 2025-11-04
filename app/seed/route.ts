import postgres from 'postgres'
import { schools } from '../lib/initial-school-data'
import { SocketAddress } from 'net'

const sql = postgres(process.env.RENO_POSTGRES_URL!, { ssl: 'require' })

async function seedSchools() {
    await sql`
        CREATE TABLE IF NOT EXISTS schools (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            contact INT NOT NULL UNIQUE,
            image_url VARCHAR(255) NOT NULL,
            email_id VARCHAR(255) NOT NULL UNIQUE
        );
    `

    const insertedSchools = await Promise.all(
        schools.map(async (s) => {
            return sql`
                INSERT INTO schools (name, address, city, state, contact, image_url, email_id)
                VALUES (${s.name}, ${s.address}, ${s.city}, ${s.state}, ${s.contact}, ${s.image_url}, ${s.email_id})
                ON CONFLICT DO UPDATE;
            `
        })
    )

    return insertedSchools;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => seedSchools())
        return Response.json({ message: 'Database seeded successfully' })
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}
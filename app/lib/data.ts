import postgres from 'postgres'
import type { School } from './definitions'

const sql = postgres(process.env.RENO_POSTGRES_URL!, { ssl: 'require' })

const ITEMS_PER_PAGE = 12;
export async function fetchSchools(currentPage: number) {
    const offset = (currentPage - 1) * (ITEMS_PER_PAGE + 1)

    try {
        const schools = await sql<School[]>`
            SELECT 
                name, address, city, state, contact, image_url, email_id
            FROM schools
            ORDER BY name ASC
            LIMIT ${ITEMS_PER_PAGE + 1} OFFSET ${offset};
        `

        return {
            schools: schools.slice(0, ITEMS_PER_PAGE),
            hasNext: schools.length > ITEMS_PER_PAGE
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch schools.')
    }
}
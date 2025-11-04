import postgres from 'postgres'

const sql = postgres(process.env.RENO_POSTGRES_URL!, { ssl: 'require' })

export async function GET() {
    try {
        await sql`DROP TABLE IF EXISTS schools;`
        return Response.json({ message: "School DB reset successfully." })
    } catch(error) {
        return Response.json({ error }, { status: 500 })
    }
}
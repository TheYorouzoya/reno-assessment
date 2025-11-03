import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'verify-full' })

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

    const insertedSchools = await sql`
        INSERT INTO schools VALUES
        (21,'est','1936 O\'Reilly Estates Suite 665\nEast Leonelbury, DC 90308','Port Ileneberg','NewHampshire',0,'http://hudson.info/','weichmann@hotmail.com'),
        (22,'hic','01200 Lebsack Lakes\nEast Jake, ND 98136','Zemlakchester','California',77,'http://www.bauch.com/','allene29@hotmail.com'),
        (24,'nihil','14576 Lelah Drive Suite 966\nNew Chanelhaven, KS 94846','East Jovanyberg','Utah',1179086025,'http://www.kuphal.com/','abraham31@gmail.com'),
        (25,'at','0975 Jaylan Manor Suite 103\nPort Trent, UT 68256-3799','Port Kelliside','NorthCarolina',1,'http://bogisichfahey.org/','wisoky.anne@halvorsonblanda.com'),
        (27,'veritatis','5806 Von Cliff\nTerryhaven, IN 67003-3148','Delfinafurt','NorthDakota',843373,'http://www.cassinbeahan.com/','vullrich@hotmail.com'),
        (29,'in','6886 Stoltenberg Branch Suite 737\nNorth Antonefort, FL 88898','Port Ransommouth','Missouri',162537,'http://www.beiertromp.net/','arno.wiza@hotmail.com'),
        (31,'odio','23283 Leon Summit\nArdellashire, FL 00573','Port Nyahside','Nebraska',631,'http://romaguera.net/','fhessel@schowalter.com'),
        (32,'ut','05902 Crystal Plaza\nDaishabury, RI 13966-1420','Huelburgh','Louisiana',342942,'http://www.willms.com/','ukihn@yahoo.com'),
        (33,'vel','09889 Balistreri Knoll\nNew Kirsten, VT 68354-0561','Stammtown','SouthCarolina',300,'http://framiwuckert.com/','oral.hermiston@mclaughlin.biz'),
        (36,'voluptatem','79838 Sally Junctions Apt. 055\nLake Rene, GA 77517','Gertrudemouth','Kansas',913868244,'http://hermiston.com/','lura.howell@kuhlman.biz'),
        (37,'architecto','6342 Grimes Port\nStarkshire, HI 94322','Keelingburgh','Alabama',651,'http://roob.info/','herdman@murray.biz')
        ON CONFLICT (id, email_id, contact) DO NOTHING;
    `

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
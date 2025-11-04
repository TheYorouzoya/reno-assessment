import postgres from 'postgres'

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

    const insertedSchools = await sql`
        INSERT INTO schools
            (name, address, city, state, contact, image_url, email_id)
        VALUES
            ('Schultz-Beatty','0232 Noelia Crossing North Cary, LA 02072-9739','Esmeraldaville','Alabama',468008,'https://loremflickr.com/640/480/','layla.feest@hotmail.com'),
            ('Boehm LLC','2391 Purdy Summit North Keven, NJ 65946-5787','West Watsonchester','Maryland',303,'https://loremflickr.com/640/480/','althea43@gmail.com'),
            ('Kuvalis-Grant','91746 Fritsch Center Rathberg, MD 06604','Franciscoburgh','NorthCarolina',540,'https://loremflickr.com/640/480/','hirthe.layla@yahoo.com'),
            ('Bayer PLC','841 Leopoldo Cove Edmundville, KS 98726-7897','Chaunceymouth','Wyoming',1,'https://loremflickr.com/640/480/','dayne63@bashirian.com'),
            ('Doyle, Turner and Thompson','14535 White Branch Lake Chelsie, DC 90211-6318','Wilbertshire','Connecticut',57,'https://loremflickr.com/640/480/','casimir.robel@goldnermacejkovic.info'),
            ('Strosin Inc','418 Ethyl Summit New Annatown, VT 44329-4726','Keshaunchester','Iowa',0,'https://loremflickr.com/640/480/','roob.pearlie@gmail.com'),
            ('Spinka, Kuhlman and King','5838 Duncan Fords Suite 705 South Christchester, NH 28244-0519','Aliyahhaven','Alaska',2147483647,'https://loremflickr.com/640/480/','alfonzo25@balistreri.info'),
            ('Blick-Ritchie','15071 Donnelly Mill Katelynview, MD 60310-6654','Russelfort','NewMexico',41,'https://loremflickr.com/640/480/','kling.jarrell@yahoo.com'),
            ('Reilly-Lebsack','4340 Keebler Shoals Suite 527 Alfredfurt, NE 19782-0704','Lake Terrance','NewYork',844632,'https://loremflickr.com/640/480/','dorthy21@lubowitzmarquardt.com'),
            ('Bednar, Treutel and Becker','350 Octavia Parkways Apt. 395 Port Raeganmouth, NY 61891-3542','Giovannifurt','California',942878,'https://loremflickr.com/640/480/','conrad60@gaylord.net'),
            ('Larkin, Klein and Steuber','17350 Vivien Point West Justontown, ID 39069','Berniceside','NewHampshire',68,'https://loremflickr.com/640/480/','goyette.ethelyn@grant.com'),
            ('Lakin, Bruen and Bode','53276 Champlin Path Apt. 309 Lake Kamilleview, NY 92835','Lake Hendersonfort','Florida',945,'https://loremflickr.com/640/480/','ernesto.dare@hotmail.com'),
            ('Ryan-Cummerata','42192 O''Connell Extensions Lake Daron, OH 85115-7834','East Claudia','Minnesota',573858,'https://loremflickr.com/640/480/','vstracke@hotmail.com'),
            ('Bechtelar Inc','615 Langosh Manors Apt. 724 Lake Cleoraborough, NH 16954-5636','South Albert','Delaware',192030,'https://loremflickr.com/640/480/','bennie21@moore.info'),
            ('Gerhold, Runolfsson and Nienow','22778 Smith Alley Apt. 121 East Kianamouth, NE 84230','East Mekhiview','NewHampshire',26,'https://loremflickr.com/640/480/','xmohr@hotmail.com'),
            ('Upton LLC','041 Alan Village New Nigelfort, KY 79938','Mraztown','Nebraska',848,'https://loremflickr.com/640/480/','donnelly.micheal@glover.com'),
            ('Fahey, Streich and Predovic','15506 Schaefer Oval Suite 162 Port Amaramouth, NH 08885-3687','Port Barrystad','Idaho',66,'https://loremflickr.com/640/480/','ostiedemann@gmail.com'),
            ('Feeney Ltd','11595 Malika Meadow East Maudehaven, NY 30359-6857','Sylvanshire','Hawaii',940757,'https://loremflickr.com/640/480/','khalil21@yahoo.com'),
            ('Daugherty-Wisoky','84099 Hodkiewicz Hills North Madalinemouth, WV 21968','Lake Andre','NewYork',1306996941,'https://loremflickr.com/640/480/','swillms@yahoo.com')
        ON CONFLICT DO UPDATE;
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
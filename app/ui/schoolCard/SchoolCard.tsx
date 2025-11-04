import { School } from "../../lib/definitions";

type SchoolCardProps = {
    school: School
}

export default function SchoolCard({ school } : SchoolCardProps) {
    return (
        <div className="school-card">
            <section className="card-image">
                <img src={school.image_url} alt={`Image of ${school.name} school`} />
            </section>
            <section className="card-body">
                <span className="school-city">{school.city}</span>
                <h3 className="school-name">{school.name}</h3>
                <span className="school-address">{school.address}</span>
            </section>
        </div>
    )
}
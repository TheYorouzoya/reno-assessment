import { School } from "../../lib/definitions";
import "./SchoolCard.css"

type SchoolCardProps = {
    school: School
}

export default function SchoolCard({ school } : SchoolCardProps) {
    return (
        <article className="school-card">
            <div className="school-image">
                <img src={school.image_url} alt={`Image of ${school.name} school`} />
            </div>
            <div className="card-body">
                <span className="school-city">{school.city}</span>
                <h3 className="school-name">{school.name}</h3>
                <span className="school-address">{school.address}</span>
            </div>
        </article>
    )
}
import { School } from "../../lib/definitions";
import SchoolCard from "./SchoolCard";

type SchoolCardWrapperProps = {
    schools: School[]
}

export default function SchoolCardWrapper({ schools } : SchoolCardWrapperProps) {
    const schoolCards = schools.map((school, index) => <SchoolCard key={index} school={school} />)
    return (
        <div className="card-wrapper">
            {schoolCards}
        </div>
    )
}
import { Suspense, useState } from "react"
import { fetchSchools } from "../lib/data"
import SchoolCardWrapper from "./SchoolCardWrapper"
import "./showSchools.css"
import Link from "next/link"

export default async function Page(props: {
    page: number
}) {
    const fetchedSchools = await fetchSchools(props.page)

    return (
        <main>
            <h1 className="">All Schools</h1>
            <section className="school-cards">
                <Suspense fallback={<div>Loading...</div>}>
                    <SchoolCardWrapper schools={fetchedSchools.schools} />
                    <div className="card-footer">
                        {props.page > 1 && 
                            <button className="card-button">
                                <Link href={`/showSchools?page=${props.page - 1}`}>
                                    Prev
                                </Link>
                            </button>}
                        {fetchedSchools.hasNext && 
                            <button className="card-button">
                                <Link href={`/showSchools?page=${props.page + 1}`}>
                                    Next
                                </Link>
                            </button>}
                    </div>
                </Suspense>
            </section>
        </main>
    )
}
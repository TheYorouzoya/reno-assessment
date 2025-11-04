import { Suspense } from "react"
import { fetchSchools } from "../lib/data"
import SchoolCardWrapper from "../ui/schoolCard/SchoolCardWrapper"
import "./showSchools.css"
import Link from "next/link"

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined}
}) {
    const pageParam = searchParams.page
    let page = 1

    if (typeof pageParam === "string") {
        const parsed = Number(pageParam)
        if (!isNaN(parsed) && parsed > 0) {
            page = parsed
        }
    }

    const fetchedSchools = await fetchSchools(page)

    return (
        <main>
            <h1 className="">All Schools</h1>
            <section className="school-cards">
                <Suspense fallback={<div>Loading...</div>}>
                    <SchoolCardWrapper schools={fetchedSchools.schools} />
                    <div className="card-footer">
                        {page > 1 && 
                            <Link href={`/showSchools?page=${page - 1}`} className="card-button">
                                Prev
                            </Link>}
                        {fetchedSchools.hasNext && 
                            <Link href={`/showSchools?page=${page + 1}`} className="card-button">
                                Next
                            </Link>}
                    </div>
                </Suspense>
            </section>
        </main>
    )
}
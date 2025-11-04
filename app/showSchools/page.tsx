import { Suspense } from "react"
import { fetchSchools } from "../lib/data"
import SchoolCardWrapper from "./SchoolCardWrapper"
import "./showSchools.css"
import Link from "next/link"

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined}>
}) {
    const { pageParam } = await searchParams
    let page: number | undefined

    if (typeof pageParam === 'string') {
        page = Number(pageParam)

        if (isNaN(page)) {
            page = 1
        }
    } else {
        page = 1
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
                            <button className="card-button">
                                <Link href={`/showSchools?page=${page - 1}`}>
                                    Prev
                                </Link>
                            </button>}
                        {fetchedSchools.hasNext && 
                            <button className="card-button">
                                <Link href={`/showSchools?page=${page + 1}`}>
                                    Next
                                </Link>
                            </button>}
                    </div>
                </Suspense>
            </section>
        </main>
    )
}
export type School = {
    name: string
    address: string
    city: string
    state: string
    contact: string
    image_url: string
    email_id: string
}

export type SchoolForm = {
    name: string
    address: string
    city: string
    state: string
    contact: string
    image: FileList
    email_id: string
}
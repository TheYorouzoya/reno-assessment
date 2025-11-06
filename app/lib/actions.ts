'use server';

import { revalidatePath } from 'next/cache';
import postgres from 'postgres'
import { z } from 'zod'
import fs from 'node:fs/promises'
import { SchoolForm } from './definitions';

const sql = postgres(process.env.RENO_POSTGRES_URL!, { ssl: 'require' })
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const SchoolFormSchema = z.object({
    name: z.string().trim().min(5).max(254),
    address: z.string().trim().min(5).max(254),
    city: z.string().trim().min(5).max(254),
    state: z.string().trim().min(5).max(254),
    contact: z.string().trim().min(5),
    image: z
        .preprocess(
            (value) => (Array.isArray(value) ? value : [value]),
            z.array(z.instanceof(File))
        )
        .refine((files) => files.length == 1, "Image is required.")
        .refine((files) => files[0].size <= MAX_IMAGE_SIZE, "Max file size if 5 MB.")
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
                "Only .jpg, .jpeg, .png, and .webp files are accepted.")
        .transform<File>(files => files[0]),
    email_id: z.email(),
})

export type SchoolFormState = {
    success: boolean
    errors?: {
        name?: string[]
        address?: string[]
        city?: string[]
        state?: string[]
        contact?: string[]
        image?: string[]
        email_id?: string[]
    }
    message?: string | null
}

export async function createSchool(schoolForm : SchoolForm) {
    const validatedFields = SchoolFormSchema.safeParse({
        name: schoolForm.name,
        address: schoolForm.address,
        city: schoolForm.city,
        state: schoolForm.state,
        contact: schoolForm.contact,
        image: schoolForm.image,
        email_id: schoolForm.email_id
    })

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create School.'
        }
    }

    const { name, address, city, state, contact, image, email_id } = validatedFields.data

    const buffer = Buffer.from(await image.arrayBuffer())
    const imageName = (name + state + image.name).replaceAll(" ", "_")
    const imagePath = `./public/schoolImages/${imageName}`
    let image_url = `/schoolImages/${imageName}`
    
    try {
        await fs.writeFile(imagePath, buffer)
    } catch (error) {
        // This is a workaround for Vercel Deployment to fallback to placeholder image
        // In production code, there would be more proper error handling here
        image_url = `/schoolImages/school.jpeg`
    }

    try {
        const sqlRes = await sql`
            INSERT INTO schools (name, address, city, state, contact, image_url, email_id)
            VALUES (${name}, ${address}, ${city}, ${state}, ${contact}, ${image_url}, ${email_id})
            ON CONFLICT (email_id) DO UPDATE SET
                name = EXCLUDED.name,
                address = EXCLUDED.address,
                city = EXCLUDED.city,
                state = EXCLUDED.state,
                contact = EXCLUDED.contact,
                image_url = EXCLUDED.image_url;
        `
    } catch (error) {
        return {
            success: false,
            message: 'Database Error: Failed to Create School.',
        }
    }

    revalidatePath("/showSchools")

    return {
        success: true,
        message: 'Successfully Created School.',
    }
}
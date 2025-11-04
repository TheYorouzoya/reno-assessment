"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import type { School } from "../../lib/definitions"
import "./AddSchoolForm.css"

export function AddSchoolForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<School>()
    const onSubmit: SubmitHandler<School> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name:</label>
            <input id="name" {...register("name", { required: true })} />
            <label htmlFor="address">Address:</label>
            <input id="address" {...register("address", { required: true })} />
            <label>City:</label>
            <input {...register("city", { required: true })} />
            <label>State:</label>
            <input {...register("state", { required: true })} />
            <label>Contact:</label>
            <input {...register("contact", { required: true })} />
            <label>Image:</label>
            <input {...register("image_url", { required: true })} />
            <label>Email:</label>
            <input {...register("email_id", { required: true })} />
            {errors.name && <span className="error">This field is required</span>}
            <input type="submit" />
        </form>
    )
}
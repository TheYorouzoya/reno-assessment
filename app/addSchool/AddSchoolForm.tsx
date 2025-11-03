"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import "./AddSchoolForm.css"

type Inputs = {
    name: string
    address: string
    city: string
    state: string
    contact: number
    image: string
    email: string
}

export function AddSchoolForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
            <input {...register("image", { required: true })} />
            <label>Email:</label>
            <input {...register("email", { required: true })} />
            {errors.name && <span class="error">This field is required</span>}
            <input type="submit" />
        </form>
    )
}
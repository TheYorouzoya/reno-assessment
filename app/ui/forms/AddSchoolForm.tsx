"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import type { SchoolForm } from "../../lib/definitions"
import "./AddSchoolForm.css"
import { createSchool, SchoolFormState } from "@/app/lib/actions"
import { useState } from "react"

export function AddSchoolForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SchoolForm>()

    const [state, setFormState] = useState<SchoolFormState>({success: false})

    const onSubmit: SubmitHandler<SchoolForm> = async (data) => {
        const newState = await createSchool(data)
        setFormState(newState)
        if (newState.errors) {
            alert("Errors!")
            console.log(newState)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <label htmlFor="name">Name:</label>
            <input id="name" {...register("name", { required: true, minLength: 5 })} />
            {errors.name && errors.name.type == "required" && <span className="error">This field is required.</span>}
            {errors.name && errors.name.type == "minLength" && <span className="error">Must be more than 5 characters.</span>}
            <div>
                {state.errors?.name && 
                    state.errors.name.map((error: string, index) => (
                        <span key={index}>{error}</span>
                    ))}
            </div>
            
            <label htmlFor="address">Address:</label>
            <input id="address" {...register("address", { required: true })} />
            {errors.address && <span className="error">This field is required.</span>}
            
            <label>City:</label>
            <input {...register("city", { required: true })} />
            {errors.city && <span className="error">This field is required.</span>}
            
            <label>State:</label>
            <input {...register("state", { required: true })} />
            {errors.state && <span className="error">This field is required.</span>}
            
            <label>Contact:</label>
            <input type="number" {...register("contact", { required: true })} />
            {errors.contact && <span className="error">This field is required.</span>}
            <div>
                {state.errors?.contact && 
                    state.errors.contact.map((error: string, index) => (
                        <span key={index}>{error}</span>
                    ))}
            </div>

            <label>Image:</label>
            <input type="file" accept="image/*" {...register("image", { required: true })} />
            {errors.image && <span className="error">This field is required.</span>}
            
            <label>Email:</label>
            <input {...register("email_id", { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i
                })} />
            {errors.email_id && errors.email_id.type == "required" && <span className="error">This field is required.</span>}
            {errors.email_id && errors.email_id.type == "pattern" && <span className="error">Email is not valid.</span>}
        
            <input type="submit" />
        </form>
    )
}
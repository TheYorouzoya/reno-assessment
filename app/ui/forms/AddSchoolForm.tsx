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
    }

    const renderField = (
        id: keyof SchoolForm,
        fieldName: string,
        label: string,
        type: string,
        opts: Record<string, any> = {},
        accept?: string
    ) => (
        <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} accept={accept} {...register(id, opts)} />
            <div className="error" aria-live="polite" aria-atomic="true">
                {errors[id]?.type === "required" && <span>{fieldName} is required.</span>}
                {errors[id]?.type === "minLength" && <span>{fieldName} must be longer than {opts.minLength} characters.</span>}
                {errors[id]?.type === "pattern" && <span>{fieldName} is invalid.</span>}
                {state.errors?.[id] &&
                    state.errors[id]!.map((err, i) => <span key={i}>{err}</span>)}
            </div>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {renderField("name", "Name", "Name*:", "text", { required: true, minLength: 5 })}
            {renderField("address", "Address", "Address*:", "text", { required: true, minLength: 5 })}
            {renderField("city", "City", "City*:", "text", { required: true, minLength: 5 })}
            {renderField("state", "State", "State*:", "text", { required: true, minLenght: 5 })}
            {renderField("contact", "Contact number", "Contact*:", "number", { required: true, minLength: 8 })}
            {renderField("image", "Image", "Image*:", "file", { required: true }, "image/*")}
            {renderField("email_id", "Email", "Email*:", "email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
        
            <div className="success" aria-live="polite" aria-atomic="true">{state.success && <span>Successfully added school to database!</span>}</div>
            <input type="submit" />
        </form>
    )
}
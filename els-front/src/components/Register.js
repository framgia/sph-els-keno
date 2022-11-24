import React from "react";
import { Form, Field } from 'react-final-form'
import { useNavigate } from "react-router-dom";
import api from '../plugins/axios'
import { successNotify } from "../plugins/toast";

const Register = () => {
    const navigate = useNavigate();

    const handleRegistration = async(formValues) => {
        const response = await api.post(`user/register`, formValues)

        if(response) {
            successNotify('Registered successfully')
            navigate('../login')
        }
        
    }

    const onSubmit = (formValues) => {
        handleRegistration(formValues)
    } 

    const validateForm = (formValues) => {
        const errors = {};

        if(!formValues.name) 
            errors.name = "Name is required"

        if(!formValues.email) 
            errors.email = "Email is required"
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email))
            errors.email = "Invalid email address"

        if(!formValues.password)
            errors.password = "Password is required"
        else if(formValues.password !== formValues.password_confirmation){
            errors.password = "Password does not match"
            errors.password_confirmation = "Password does not match"
        }

        return errors;
    } 

    return (
        <div className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium">Register</div>
            <Form 
                onSubmit={ onSubmit }
                validate= { validateForm }
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={ handleSubmit } className="flex w-[30rem] flex-col space-y-10">
                        <Field name="name">
                            {({ input,meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="text"
                                            placeholder="Name"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="email">
                            {({ input,meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="text"
                                            placeholder="Email"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="password"
                                            placeholder="Password"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                                
                            )}
                        </Field>
                        <Field name="password_confirmation">
                            {({ input, meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="password"
                                            placeholder="Confirm password"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <button 
                            type="submit" disabled={submitting}
                            className="transform rounded-sm text-white bg-blue-600 py-2 font-bold duration-300 hover:bg-blue-800"
                        > Register</button>
                    </form>
                )}
            >
            </Form>
        </div>
    )
}

export default Register;

import React from "react";
import { Link } from "react-router-dom";
import { Form, Field } from 'react-final-form'
import api from '../plugins/axios'
import { errorNotify, successNotify } from "../plugins/toast";

const Login = () => {

    const handleLogin = async ( formValues, type = 'user' ) => {
        const response = await api.post(`${type}/login`, formValues)
     
        if(response.data.error) {
            if(type === 'user')
                handleLogin(formValues,'admin')
            else 
                errorNotify('Invalid credentails')
        } else {
            successNotify("Login successfully")
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('access_type', type)

            window.location.reload();
        }
    
    }

    const onSubmit = (formValues) => {
        handleLogin(formValues)
    } 

    return (
        <div className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium">Log In</div>
            <Form 
                onSubmit={ onSubmit }
                validate= {(formValues) => {
                    const errors = {};

                    if(!formValues.email) 
                        errors.email = "Email is required"
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email))
                        errors.email = "Invalid email address"

                    if(!formValues.password)
                        errors.password = "Password is required"

                    return errors;
                }}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={ handleSubmit } className="flex w-[30rem] flex-col space-y-10">
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
                        <button 
                            type="submit" disabled={submitting}
                            className="transform rounded-sm text-white bg-blue-600 py-2 font-bold duration-300 hover:bg-blue-800"
                        > LOG IN</button>
                    </form>
                )}
            >
            </Form>
            <p className="text-center text-lg">
                No account?
                <Link 
                    to="/auth/register"
                    className="font-medium pl-1 text-blue-500 underline-offset-4 hover:underline"
                >
                    Create One
                </Link>
            </p>
        </div>
    )
}

export default Login;

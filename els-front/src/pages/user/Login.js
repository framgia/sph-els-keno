import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Field } from 'react-final-form'
import api from '../../plugins/axios'
import { errorNotify, successNotify } from "../../plugins/toast";
import { setUserToken, setUserType } from "../../plugins/localStorageHelper";
import { pathType } from "../../plugins/Router/routeHelper";
import Button from "../../components/Button";

const Login = () => {
    const loginType = pathType(useLocation())
    const handleLogin = async ( formValues ) => {
        const response = await api.post(`${loginType}/login`, formValues)
     
        if(response.data.error) {
            errorNotify('Invalid credentails')
        } else {
            successNotify("Login successfully")
            setUserToken(response.data.token)
            setUserType(loginType)
            
            window.location.reload();
        }
    
    }

    const onSubmit = (formValues) => {
        handleLogin(formValues)
    } 

    const validateForm = (formValues) => {
        const errors = {};

        if(!formValues.email) 
            errors.email = "Email is required"
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email))
            errors.email = "Invalid email address"

        if(!formValues.password)
            errors.password = "Password is required"

        return errors;
    } 

    const renderRegistration = () => {
        return loginType === "user" ? 
        <p className="text-center text-lg">
            No account?
            <Link 
                to="/auth/register"
                className="font-medium pl-1 text-blue-500 underline-offset-4 hover:underline"
            >
                Create One
            </Link>
        </p> : null
    }

    return (
        <div className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium">Log In {loginType.toUpperCase()}</div>
            <Form 
                onSubmit={ onSubmit }
                validate= { validateForm }
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
                        <Button 
                            type="submit" isDisabled={submitting}
                        > LOG IN</Button>
                    </form>
                )}
            >
            </Form>
            {renderRegistration()}
        </div>
    )
}

export default Login;

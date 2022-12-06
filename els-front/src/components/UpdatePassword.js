import React from "react";
import { Form, Field } from 'react-final-form'
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import api from '../plugins/axios'
import { successNotify } from "../plugins/toast";

const UpdatePassword = () => {
    const navigate = useNavigate();

    const handleUpdate = async(formValues) => {
        const response = await api.post(`user/update-password`, formValues)

        if(response) {
            successNotify('Updated password successfully')
            navigate(0)
        }
        
    }

    const validateForm = (formValues) => {
        const errors = {};

        if(!formValues.password) 
            errors.password = "Password is required"
        
        if(!formValues.new_password)
            errors.new_password = "New Password is required"
        else if(formValues.new_password !== formValues.new_password_confirmation){
            errors.new_password = "New Password does not match"
            errors.new_password_confirmation = "New Password does not match"
        }

        return errors;
    } 

    return (
        <div className="w-full h-full mt-16 ml-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-4xl font-medium">Update password</div>
            <Form 
                onSubmit={ handleUpdate }
                validate= { validateForm }
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={ handleSubmit } className="flex w-[30rem] flex-col space-y-10 mt-5 mx-5">
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
                        <Field name="new_password">
                            {({ input, meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="password"
                                            placeholder="New Password"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                                
                            )}
                        </Field>
                        <Field name="new_password_confirmation">
                            {({ input, meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                            )}
                        </Field> 
                        <Button 
                            type="submit" submitting={submitting}
                        > Update</Button>
                    </form>
                )}
            >
            </Form>
        </div>
    )
}

export default UpdatePassword;

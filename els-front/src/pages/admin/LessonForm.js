import React from "react";
import { Form, Field } from 'react-final-form'
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import useLesson from "../../hooks/useLesson";
import api from '../../plugins/axios'
import { successNotify } from "../../plugins/toast";

const LessonForm = () => {
    const { id,category_id } = useParams();
    const { lesson } = useLesson(id,category_id); 
    const navigate = useNavigate();
    const action_type = id ? 'Update':'Create'
    
    const proceed = () => {
        successNotify(`${action_type}d lesson successfully`)
        navigate(-1)
    }

    const handleSubmition = async(formValues) => {
        if(id){
            const response = await api.put(`admin/quizzes/${id}`, formValues)

            if(response) {
                proceed()
            }
        }
        else {
            const response = await api.post(`admin/quizzes`, formValues)

            if(response) {
                proceed()
            }
        }
    }

    const validateForm = (formValues) => {
        const errors = {};

        if(!formValues.name) 
            errors.name = "Name is required"
        if(!formValues.description) 
            errors.description = "Description is required"

        return errors;
    } 

    return (
        <div className="w-full h-full mt-16 ml-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-4xl font-medium">{action_type} lesson</div>
            <Form 
                onSubmit={ handleSubmition }
                initialValues={lesson}
                validate= { validateForm }
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={ handleSubmit } className="flex w-[30rem] flex-col space-y-10 mt-5 mx-5">
                        <Field name="name">
                            {({ input, meta }) => (
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
                        <Field name="description">
                            {({ input, meta }) => (
                                <div className="h-12">
                                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-blue-500">
                                        <input
                                            {...input}
                                            type="text"
                                            placeholder="Description"
                                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                                        />
                                    </div>
                                    {meta.error && meta.touched && <span className="text-red-300">{meta.error}</span>}
                                </div>
                                
                            )}
                        </Field>
                        <Button 
                            type="submit" isDisabled={submitting}
                        > {action_type}</Button>
                    </form>
                )}
            >
            </Form>
        </div>
    )
}

export default LessonForm;

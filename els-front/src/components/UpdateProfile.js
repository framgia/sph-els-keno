import React,{ useRef, useState } from "react";
import { Form, Field } from 'react-final-form'
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import api from '../plugins/axios'
import { successNotify } from "../plugins/toast";

const UpdateProfile = ({user,refreshUser}) => {
    const [image, setImage] = useState(user.avatar);
    const inputAvatar = useRef(null);

    const handleUpdate = async(formValues) => {
        const response = await api.post(`user/update-credentials`, {...formValues,avatar : image})

        if(response) {
            successNotify('Updated profile successfully')
            refreshUser()
        }
        
    }

    const handleAvatarChange = (e) => {
        var fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onload = (e) => {
            setImage(e.target.result)
        }
    }

    const validateForm = (formValues) => {
        const errors = {};

        if(!formValues.name) 
            errors.name = "Name is required"

        if(!formValues.email) 
            errors.email = "Email is required"
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email))
            errors.email = "Invalid email address"

        return errors;
    } 

    return (
        <div className="w-full h-full mt-16 ml-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-4xl font-medium">Update Profile</div>
            <div className="flex mt-5">
                <div>
                    <img className="object-contain h-60 w-60" src={image || '/logo192.png'} onClick={() => inputAvatar.current.click()}/>
                    <input
                        type="file"
                        name="myImage"
                        ref={inputAvatar}
                        hidden
                        onChange={handleAvatarChange}
                        accept="image/*"
                    />
                    <small className="text-gray-400">Click image to select</small>
                </div>
                <Form 
                    onSubmit={ handleUpdate }
                    validate= { validateForm }
                    initialValues={user}
                    render={({ handleSubmit, submitting }) => (
                        <form  onSubmit={ handleSubmit } className="flex w-[30rem] flex-col space-y-10 mt-5 mx-5">
                            <Field name="name">
                                {({ input,meta }) => (
                                    <div className="h-5">
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
                                    <div className="h-5">
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
                            <Button 
                                type="submit" submitting={submitting}
                            > Update</Button>
                        </form>
                    )}
                >
                </Form>
                
            </div>
        </div>
    )
}

export default UpdateProfile;

import React from "react";
import { Link } from "react-router-dom";
import api from '../plugins/axios'
import { getUserType, setUserToken, setUserType } from "../plugins/localStorageHelper";
import { errorNotify, successNotify } from "../plugins/toast";

const TopNav = () => {
    const type = getUserType()
    
    const renderUserType = () => {
        return type === 'admin' ? '| ADMIN' : ''
    }

    const renderPath = (path) => {
        return type === 'admin'? `/admin/${path}` : path
    }

    const logoutUser = async () => {
        const response = await api.post(`${type}/logout`)

        if(response.data.error) {
            errorNotify('Invalid credentails')
        } else {
            successNotify("Logout successfully")
            setUserToken('')
            setUserType('')
            
            window.location.reload();
        }
    }

    return (
        <div>
            <nav className="bg-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">

                        <div className="flex space-x-4">
                            <div>
                                <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                    <span className="font-bold">E-learning-system {renderUserType} </span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            <Link to={`${renderPath('categories')}`} className="py-5 px-3">Categories</Link>
                            <Link to="/" className="py-5 px-3">Users</Link>
                            <div 
                                className="py-5 px-3 cursor-pointer hover:bg-slate-100"
                                onClick={logoutUser}    
                            >Logout</div>
                        </div>

                    </div>
                </div>

            </nav>
        </div>
    );
}

export default TopNav

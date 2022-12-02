import React from "react";
import { AiFillEye } from "react-icons/ai";
import useUsers from "../hooks/useUsers";
import { loadingScreenShow } from "../plugins/loader";

const Users = () => {
    const { users } = useUsers();

    const renderUsers = () => {
        return users.map(user => {
            return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                </th>
                <td className="py-4 px-6">
                    {user.email}
                </td>
                <td className="py-4 px-6">
                    <AiFillEye className="h-5 w-5 text-green-300 cursor-pointer" />
                </td>
            </tr>
        })
    }
    
    if(!users) 
        return loadingScreenShow()
    else if(users.length === 0) 
        return <div className="text-center mt-20">No users found</div>

    return (
        <div className="overflow-x-auto relative mt-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </table>
        </div>
    )
}

export default Users;

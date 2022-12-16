import React,{ useEffect, useState } from "react";
import useCategories from "../../hooks/useCategories";
import { AiFillPlusCircle,AiFillEye, AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import api from '../../plugins/axios'
import { successNotify } from "../../plugins/toast";
import { loadingScreenShow } from "../../plugins/loader";
import Paginator from "../../components/Paginator";

const Categories = () => {
    const [deletion, setDeletion] = useState({
        id : null,
        is_deleting : false
    });
    const [page, setPage] = useState(1);
    const { categories, pageCount,checkCategories } = useCategories(page);
    const navigate = useNavigate();

    const deleteCategory = async () => {
        const response = await api.delete(`admin/categories/${deletion.id}`)

        if(response){
            successNotify(`Deleted category successfully`)
            checkCategories()
        }

        setDeletion({  id : null,is_deleting : false})
    }

    const renderCategories = () => {
        return categories.map(category => {
            return <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category.name}
                </th>
                <td className="py-4 px-6 flex">
                    <AiFillEye className="h-5 w-5 text-green-300 cursor-pointer" onClick={() => navigate(`/admin/category/${category.id}/lessons`)}/>
                    <AiTwotoneDelete className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => setDeletion({  id : category.id,is_deleting : true}) }/>
                    <AiFillEdit className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => navigate(`/admin/categories/edit/${category.id}`)}/>
                </td>
            </tr>
        })
    }

    if(!categories) 
        return loadingScreenShow()
    else if(categories.length === 0) 
        return <div className="text-center mt-20">No categories found</div>


    return (
        <div className="overflow-x-auto relative mt-2">
            <div className="flex ">
                <div className="text-3xl my-4">Categories</div>
                <AiFillPlusCircle onClick={() => navigate('/admin/categories/create')} className="text-5xl ml-4 mt-2 text-gray-500 cursor-pointer"/>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderCategories()}
                </tbody>
            </table>
            <Paginator page={page} pageCount={pageCount} setPage={setPage} />
            <Modal isDeleting={deletion.is_deleting} proceedProcess={() => deleteCategory()} closeModal={() => setDeletion({  id : null,is_deleting : false})}/>
        </div>
    )
}

export default Categories;
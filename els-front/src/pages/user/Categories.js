import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Paginator from "../../components/Paginator";
import useCategories from "../../hooks/useCategories";
import { loadingScreenShow } from "../../plugins/loader";

const Categories = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { categories, pageCount } = useCategories(page,6);

    const renderCategories = () => {
        return categories.map(category => {
            return <div key={category.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{category.description}</p>
                <Button 
                    btnClass="mt-5 b-0 mb-2 px-5 float-right rounded-2xl"
                    onClick={() => navigate(`/categories/${category.id}/lessons`)}
                >Start</Button>
            </div>
        })
    }

    if(!categories) 
        return loadingScreenShow()
    else if(categories.length === 0) 
        return <div className="text-center mt-20">No categories found</div>

    return (
        <div>
            <div className="text-2xl my-4">Categories</div>
            <div className="grid grid-cols-3 gap-3">
                {renderCategories()}
            </div>
            <Paginator page={page} pageCount={pageCount} setPage={setPage} />

        </div>
    );
}

export default Categories;

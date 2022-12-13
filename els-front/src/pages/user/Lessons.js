import React from "react";
import { MdQuiz } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import useLessons from "../../hooks/useLessons";
import { loadingScreenShow } from "../../plugins/loader";

const Lessons = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { lessons,categoryName } = useLessons(id);

    const renderLessons = () => {
        return lessons.map(lesson => {
            return <tr key={lesson.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {lesson.name}
                </th>
                <td className="py-4 px-6">
                    <div onClick={() => navigate(`/lessons/${lesson.id}`)} className="flex  cursor-pointer text-green-600 hover:text-green-400">
                        <span className=" text-xl">Take</span>
                        <MdQuiz className="pl-2 text-2xl"/>
                    </div>
                </td>
            </tr>
        })
    }
    
    if(!lessons) 
        return loadingScreenShow()
    else if(lessons.length === 0) 
        return <div className="text-center mt-20">No lessons found</div>

    return (
        <div className="overflow-x-auto relative mt-2">
            <div className="text-3xl my-5">{categoryName}</div>
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
                    {renderLessons()}
                </tbody>
            </table>
        </div>
    )
}

export default Lessons;

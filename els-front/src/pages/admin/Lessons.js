import React,{ useState } from "react";
import useLessons from "../../hooks/useLessons";
import { AiFillPlusCircle,AiFillEye, AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import api from '../../plugins/axios'
import { successNotify } from "../../plugins/toast";
import { loadingScreenShow } from "../../plugins/loader";

const Lessons = () => {
    const { category_id } = useParams();
    const [deletion, setDeletion] = useState({
        id : null,
        is_deleting : false
    });
    const { lessons,categoryName,checkLessons } = useLessons(category_id);
    const navigate = useNavigate();

    const deleteLesson = async () => {
        const response = await api.delete(`admin/quizzes/${deletion.id}`)

        if(response){
            successNotify(`Deleted lesson successfully`)
            checkLessons()
        }
        
        setDeletion({  id : null, is_deleting : false})
    }

    const renderLessons = () => {
        return lessons.map(lesson => {
            return <tr key={lesson.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {lesson.name}
                </th>
                <td className="py-4 px-6 flex">
                    <AiFillEye className="h-5 w-5 text-green-300 cursor-pointer" onClick={() => navigate(`/admin/lesson/${lesson.id}/words`)} />
                    <AiTwotoneDelete className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => setDeletion({  id : lesson.id,is_deleting : true}) }/>
                    <AiFillEdit className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => navigate(`/admin/category/${category_id}/lessons/edit/${lesson.id}`)}/>
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
            <div className="flex ">
                <div className="text-3xl my-4">{categoryName} | Lessons</div>
                <AiFillPlusCircle onClick={() => navigate(`/admin/category/${category_id}/lessons/create`)} className="text-5xl ml-4 mt-2 text-gray-500 cursor-pointer"/>
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
                    {renderLessons()}
                </tbody>
            </table>
            <Modal isDeleting={deletion.is_deleting} proceedProcess={() => deleteLesson()} closeModal={() => setDeletion({  id : null,is_deleting : false})}/>
        </div>
    )
}

export default Lessons;

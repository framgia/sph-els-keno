import React,{ useState } from "react";
import useWords from "../../hooks/useWords";
import { AiFillPlusCircle, AiTwotoneDelete, AiFillEdit,AiFillEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import api from '../../plugins/axios'
import { successNotify } from "../../plugins/toast";

const Words = () => {
    const { lesson_id } = useParams();
    const [deletion, setDeletion] = useState({
        id : null,
        is_deleting : false
    });
    const { words,lessonName,checkWords } = useWords(lesson_id);
    const navigate = useNavigate();

    const deleteWord = async () => {
        const response = await api.delete(`admin/words/${deletion.id}`)

        if(response){
            successNotify(`Deleted word successfully`)
            setDeletion({  id : null,is_deleting : false})
            checkWords()
        }
    }

    const renderWords = () => {
        return words.map(word => {
            return <tr key={word.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {word.word}
                </th>
                <td className="py-4 px-6 flex">
                    <AiFillEye className="h-5 w-5 text-green-300 cursor-pointer" onClick={() => navigate(`/admin/word/${word.id}/choices`)}/>
                    <AiTwotoneDelete className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => setDeletion({  id : word.id,is_deleting : true}) }/>
                    <AiFillEdit className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => navigate(`/admin/lesson/${lesson_id}/words/edit/${word.id}`)}/>
                </td>
            </tr>
        })
    }

    if(!words) return null;

    return (
        <div className="overflow-x-auto relative mt-2">
            <div className="flex ">
                <div className="text-3xl my-4">{lessonName} | Words</div>
                <AiFillPlusCircle onClick={() => navigate(`/admin/lesson/${lesson_id}/words/create`)} className="text-5xl ml-4 mt-2 text-gray-500 cursor-pointer"/>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Word
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderWords()}
                </tbody>
            </table>
            <Modal isDeleting={deletion.is_deleting} proceedProcess={() => deleteWord()} closeModal={() => setDeletion({  id : null,is_deleting : false})}/>
        </div>
    )
}

export default Words;

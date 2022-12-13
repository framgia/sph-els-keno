import React,{ useState } from "react";
import useChoices from "../../hooks/useChoices";
import { AiFillPlusCircle, AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import api from '../../plugins/axios'
import { successNotify } from "../../plugins/toast";
import Button from "../../components/Button";

const Choices = () => {
    const { word_id } = useParams();
    const [deletion, setDeletion] = useState({
        id : null,
        is_deleting : false
    });
    const { choices,wordName,checkChoices } = useChoices(word_id);
    const navigate = useNavigate();

    const deleteChoice = async () => {
        const response = await api.delete(`admin/choices/${deletion.id}`)

        if(response){
            successNotify(`Deleted choice successfully`)
            setDeletion({  id : null,is_deleting : false})
            checkChoices()
        }
    }

    const setCorrectAnswer = async ({choice,id}) => {
        const response = await api.post(`admin/choices/set-to-correct/${id}`)

        if(response){
            successNotify(`Updated ${choice} as correct answer successfully`)
            checkChoices()
        }
    }

    const renderSetCorrectBtn = (choice) => {
        if(choice.correct_answer === 0) 
            return <Button btnClass="px-2 mr-1"  usage="set_correct" onClick={() => setCorrectAnswer(choice)}>Set as right answer</Button>
    }

    const renderChoices = () => {
        return choices.map(choice => {
            return <tr key={choice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {choice.choice}
                </th>
                <td className="py-4 px-6 flex">
                    {renderSetCorrectBtn(choice)}
                    <AiTwotoneDelete className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => setDeletion({  id : choice.id,is_deleting : true}) }/>
                    <AiFillEdit className="h-5 w-5 text-red-300 cursor-pointer" onClick={() => navigate(`/admin/word/${word_id}/choices/edit/${choice.id}`)}/>
                </td>
            </tr>
        })
    }

    if(!choices) return null;

    return (
        <div className="overflow-x-auto relative mt-2">
            <div className="flex ">
                <div className="text-3xl my-4">{wordName} | Choices</div>
                <AiFillPlusCircle onClick={() => navigate(`/admin/word/${word_id}/choices/create`)} className="text-5xl ml-4 mt-2 text-gray-500 cursor-pointer"/>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Choice
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderChoices()}
                </tbody>
            </table>
            <Modal isDeleting={deletion.is_deleting} proceedProcess={() => deleteChoice()} closeModal={() => setDeletion({  id : null,is_deleting : false})}/>
        </div>
    )
}

export default Choices;

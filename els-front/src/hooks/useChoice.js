import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useChoice = (id,word_id) => {
    const [choice, setChoice] = useState({
        choice : '',
        word_id
    });

    useEffect(() => {
        if(id) {
            const checkChoice = async () => {
                const response = await api.get(`admin/choices/${id}`)
                setChoice({
                    ...choice,
                    choice : response.data.choice,
                    correct_answer : response.data.correct_answer,
                })
            }
            checkChoice()
        }
    },[id]);

    return { choice };
}

export default useChoice;
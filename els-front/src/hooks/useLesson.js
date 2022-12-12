import { useState, useEffect } from "react";
import LessonForm from "../pages/admin/LessonForm";
import api from '../plugins/axios'

const useLesson = (id,category_id) => {
    const [lesson, setLesson] = useState({
        name : '',
        description : '',
        category_id
    });

    useEffect(() => {
        if(id) {
            const checkLesson = async () => {
                const { data } = await api.get(`admin/quizzes/${id}`)
                setLesson({
                    ...lesson,
                    name : data.name,
                    description : data.description,
                })
            }
            checkLesson()
        }
    },[id]);

    return { lesson };
}

export default useLesson;
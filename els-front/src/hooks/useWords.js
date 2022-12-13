import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useWords = (id) => {
    const [words, setWords] = useState(null);
    const [lessonName,setLessonName] = useState(null);

    const token = getUserToken()

    const checkWords = async () => {
        const type = getUserType()

        const { data } = await api.get(`${type}/quizzes/${id}`)
        setWords(data.words)
        setLessonName(data.name)
    }

    useEffect(() => {

        if(token) {
            checkWords()
        }
    },[id]);

  return { words,lessonName,checkWords };
}

export default useWords;
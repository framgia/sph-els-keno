import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useQuizWords = (id) => {
    const [quizWords, setQuizWords] = useState(null);
    const [quizName, setQuizName] = useState(null);

  useEffect(() => {
        const token = getUserToken()

        if(token) {
            const getWords = async () => {
                const type = getUserType()

                const response = await api.get(`${type}/quizzes/${id}`)
                
                setQuizWords(response.data.words.map(word => {
                    return {
                        ...word,
                        choice_id : null,
                    }
                }))
                setQuizName(response.data.name)
            }

            getWords()
        }
  },[id]);

  return { quizWords,quizName };
}

export default useQuizWords;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";
import { errorNotify } from "../plugins/toast";

const useQuizWords = (id) => {
    const [quizWords, setQuizWords] = useState(null);
    const [quizName, setQuizName] = useState(null);
    const navigate = useNavigate()

  useEffect(() => {
        const token = getUserToken()

        if(token) {
            const getWords = async () => {
                const type = getUserType()

                const { data }= await api.get(`${type}/quizzes/${id}`)

                if(data.already_taken) {
                    errorNotify("Lesson already taken")
                    navigate(-1)
                }
                else{
                    setQuizWords(data.words.map(word => {
                        return {
                            ...word,
                            choice_id : null,
                        }
                    }))
                    setQuizName(data.name)
                }

            }

            getWords()
        }
  },[id]);

  return { quizWords,quizName };
}

export default useQuizWords;
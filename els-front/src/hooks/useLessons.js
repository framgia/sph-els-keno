import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useLessons = (id) => {
    const [lessons, setLessons] = useState(null);
    const [categoryName,setCategoryName] = useState(null);

    useEffect(() => {
            const token = getUserToken()

            if(token) {
                const checkUser = async () => {
                    const type = getUserType()

                    const response = await api.get(`${type}/categories/${id}`)
                    setLessons(response.data.quizzes)
                    setCategoryName(response.data.name)
                }

                checkUser()
            }
    },[id]);

  return { lessons,categoryName };
}

export default useLessons;
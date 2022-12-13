import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useLessons = (id) => {
    const [lessons, setLessons] = useState(null);
    const [categoryName,setCategoryName] = useState(null);

    const token = getUserToken()

    const checkLessons = async () => {
        const type = getUserType()

        const response = await api.get(`${type}/categories/${id}`)
        setLessons(response.data.quizzes)
        setCategoryName(response.data.name)
    }

    useEffect(() => {

        if(token) {
            checkLessons()
        }
    },[id]);

  return { lessons,categoryName,checkLessons };
}

export default useLessons;
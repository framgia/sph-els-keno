import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useCategories = () => {
    const [categories, setCategories] = useState(null);

    const type = getUserType()
    const token = getUserToken()

    const checkCategories = async () => {
        const response = await api.get(`${type}/categories`)
        setCategories(response.data.data)
    }

    useEffect(() => {
        if(token && type) {
            checkCategories()
        }
    },[]);

  return { categories,checkCategories };
}

export default useCategories;
import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useCategories = () => {
    const [categories, setCategories] = useState(null);

  useEffect(() => {
        const type = getUserType()
        const token = getUserToken()

        if(token && type) {
            const checkCategories = async () => {
                const response = await api.get(`${type}/categories`)
                setCategories(response.data.data)
            }
            
            checkCategories()
        }
  },[]);

  return { categories };
}

export default useCategories;
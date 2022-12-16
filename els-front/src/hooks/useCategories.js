import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useCategories = (page,perPage = 10) => {
    const [categories, setCategories] = useState(null);
    const [pageCount, setPageCount] = useState(1);

    const type = getUserType()
    const token = getUserToken()

    const checkCategories = async () => {
        const { data } = await api.get(`${type}/categories?page=${page}&per_page=${perPage}`)
        setCategories(data.data)
        setPageCount(data.last_page)
    }

    useEffect(() => {
        if(token && type) {
            checkCategories()
        }
    },[page]);

  return { categories, pageCount, checkCategories };
}

export default useCategories;
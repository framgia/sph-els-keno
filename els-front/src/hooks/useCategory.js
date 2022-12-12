import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useCategory = (id) => {
    const [category, setCategory] = useState({
        name : '',
        description : ''
    });

    useEffect(() => {
        if(id) {
            const checkCategory = async () => {
                const { data } = await api.get(`admin/categories/${id}`)
                setCategory({
                    name : data.name,
                    description : data.description
                })
            }
            checkCategory()
        }
    },[id]);

    return { category };
}

export default useCategory;
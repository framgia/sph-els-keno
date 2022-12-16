import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useChoices = (id) => {
    const [choices, setChoices] = useState(null);
    const [wordName,setWordName] = useState(null);

    const token = getUserToken()

    const checkChoices = async () => {
        const type = getUserType()

        const { data } = await api.get(`${type}/words/${id}`)
        setChoices(data.choices)
        setWordName(data.word)
    }

    useEffect(() => {

        if(token) {
            checkChoices()
        }
    },[id]);

  return { choices,wordName,checkChoices };
}

export default useChoices;
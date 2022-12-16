import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserType } from "../plugins/localStorageHelper";

const useProfile = (id) => {
    const [user, setUser] = useState(null);
    const type = getUserType()

    const checkProfile = async () => {
        const response = await api.get(`${type}/users/${id}`)
        setUser(response.data)
    }

    useEffect(() => {
        checkProfile()
    },[id]);

    return { user, checkProfile };
}

export default useProfile;
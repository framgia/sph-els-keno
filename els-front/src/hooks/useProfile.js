import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useProfile = (id) => {
    const [user, setUser] = useState(null);

    const checkProfile = async () => {
        const response = await api.get(`user/users/${id}`)
        setUser(response.data)
    }

    useEffect(() => {
        checkProfile()
    },[id]);

    return { user, checkProfile };
}

export default useProfile;
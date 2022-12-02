import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useProfile = (id) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const checkProfile = async () => {
            const response = await api.get(`user/users/${id}`)
            setUser(response.data)
        }
        
        checkProfile()
    },[id]);

    return { user };
}

export default useProfile;
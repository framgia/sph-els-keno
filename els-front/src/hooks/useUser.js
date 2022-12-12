import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useUser = () => {
    const [user, setUser] = useState(null);

    const type = getUserType()
    const token = getUserToken()

    const checkUser = async () => {
        const response = await api.get(`${type}/details`)
        setUser({
            ...response.data,
            avatar : response.data.avatar ? process.env.REACT_APP_API_URL+response.data.avatar : null,
        })
    }
    useEffect(() => {
            if(token && type) {
                checkUser()
            } else {
                setUser('unauthenticated')
            }
    },[]);

  return { user,checkUser };
}

export default useUser;
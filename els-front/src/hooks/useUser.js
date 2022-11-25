import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useUser = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
        const type = getUserType()
        const token = getUserToken()

        if(token && type) {
            const checkUser = async () => {
                const response = await api.get(`${type}/details`)
                setUser(response.data)
            }
            
            checkUser()
        }
  },[]);

  return { user };
}

export default useUser;
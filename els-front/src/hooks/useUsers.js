import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useUsers = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
        const token = getUserToken()

        if(token) {
            const checkUser = async () => {
                const type = getUserType()

                const response = await api.get(`${type}/users`)
                setUsers(response.data.data)
            }

            checkUser()
        }
  },[]);

  return { users };
}

export default useUsers;
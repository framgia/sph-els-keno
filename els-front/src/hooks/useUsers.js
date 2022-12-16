import { useState, useEffect } from "react";
import api from '../plugins/axios'
import { getUserToken, getUserType } from "../plugins/localStorageHelper";

const useUsers = (page,perPage = 10) => {
    const [users, setUsers] = useState(null);
    const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
        const token = getUserToken()

        if(token) {
            const checkUser = async () => {
                const type = getUserType()

                const { data } = await api.get(`${type}/users?page=${page}&per_page=${perPage}`)
                setUsers(data.data)        
                setPageCount(data.last_page)
            }

            checkUser()
        }
  },[page]);

  return { users, pageCount };
}

export default useUsers;
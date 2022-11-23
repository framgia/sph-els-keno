import { useState, useEffect } from "react";
import api from '../plugins/axios'

const useUser = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
      const type = localStorage.getItem('access_type')

      const checkUser = async () => {
          const response = await api.get(`${type}/details`)
          setUser(response.data)
      }

      checkUser()
  },[]);

  return [user];
}

export default useUser;
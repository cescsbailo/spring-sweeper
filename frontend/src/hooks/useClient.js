import { useEffect, useState } from "react"
import axios from "axios"

const useClient = (user) => {

    const [client, setClient] = useState(null)

    useEffect(() => {
        if(!user){
            return
        }

        const apiClient = axios.create({
            baseURL: 'http://localhost:8080/api/v1',
            withCredentials: true,
            auth: {
                username: user.username,
                password: user.password
            }
        })

        
   // client.interceptors.response.use((response) => response, (error) => {
      // whatever you want to do with the error
   //   console.log(error)
  //    throw error;
  //  });

        setClient(apiClient)
    }, [user])

    return client
}

export default useClient
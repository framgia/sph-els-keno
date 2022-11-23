import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorNotify } from "./toast";

const httpClient = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(function(config) {
  let getAuthToken = () => localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${getAuthToken()}`;

  return config;
})

httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  let messages = []
  const navigate = useNavigate();
  switch (error.response.status) {
      case 404:
          // messages.push('nous n'avons pas trouvé cette page')

          break;
      case 500:
          messages.push('Internal Server Error. Please contact the developer to resolve this issue.')
          break;
      case 503:
          messages.push('Service unavailable, please check your internet connection to continue.')
          break;
      case 401:
          localStorage.setItem('token', '')
          navigate('/auth/login')
          messages.push('You are not logged in. Please login first.')
          break;
      case 422:
          messages.push(error.response.data.message)
          break;
      default:
          messages.push('Opps, something went wrong in processing your request.')
          break;
  }
  messages.forEach(message => errorNotify(message))
  console.log(messages)
});

export default httpClient;

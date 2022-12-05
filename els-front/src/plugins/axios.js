import axios from "axios";
import { getUserToken, setUserToken } from "./localStorageHelper";
import { errorNotify } from "./toast";

const httpClient = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(function(config) {
  let getAuthToken = getUserToken()
  config.headers.Authorization = `Bearer ${getAuthToken}`;

  return config;
})

httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  let messages = []

  switch (error.response.status) {
      case 404:
          // messages.push('nous n'avons pas trouvé cette page')

          break;
      case 500:
          messages.push('Internal Server Error.')
          break;
      case 503:
          messages.push('Service unavailable, please check your internet connection to continue.')
          break;
      case 401:
          setUserToken('')
          // history.push('/auth/login') Reminder to implement this
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

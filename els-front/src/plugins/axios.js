import axios from "axios";

const httpClient = axios.create({
  baseURL : process.env.REACT_APP_API_UR,
});

export default httpClient;

import axios from "axios";

const apiBaseURL =
  process.env.REACT_APP_PUBLIC_API_URL ||
  "https://www.laurent.c2sportsprod.com/admin/api";
const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true // Permet d'envoyer des cookies
});

export default apiClient;

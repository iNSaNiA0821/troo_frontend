
import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'Application/json'
  }
});
export default api;
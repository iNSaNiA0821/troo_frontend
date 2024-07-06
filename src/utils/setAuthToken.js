import api from './api';
import { useHistory } from "react-router-dom";
const setAuthToken = async (token) => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');        
        useHistory.push("/login");
    } 
   
};

export default setAuthToken;

import axios from "axios";

const UserLogin = async (params) => {
    const loginEndpoint = "http://localhost:3002/user/login";

    try {
        const response = await axios.post(loginEndpoint, params);

        localStorage.setItem("token", response.data.token)
        return response.data;
        
    } catch (error) {

        console.error(error);
        return null;
    }
};

export default UserLogin;


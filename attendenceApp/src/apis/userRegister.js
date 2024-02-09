import axios from "axios";

const UserSignup = async (params) => {
    const loginEndpoint = "http://localhost:3002/user/signup";

    try {
        const response = await axios.post(loginEndpoint, params);

        return response.data;
    } catch (error) {

        console.error(error.response.data);
        return null;
    }
};

export default UserSignup;

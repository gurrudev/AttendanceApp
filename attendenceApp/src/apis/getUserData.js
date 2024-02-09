import axios from "axios";


// Define the function for making an authorized request
const GetUserData = async (token) => {
    const authorizedEndpoint = 'http://localhost:3002/user/userData';

    try {
        const response = await axios.get(authorizedEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response
    } catch (error) {
       
        console.error('Unauthorized access:', error);
    }
}

export default GetUserData




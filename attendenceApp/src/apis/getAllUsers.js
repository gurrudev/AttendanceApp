import axios from "axios";


// Define the function for making an authorized request
const GetAllUsers = async () => {
    const authorizedEndpoint = 'http://localhost:3002/user/allUsers';

    try {
        const response = await axios.get(authorizedEndpoint);
        
        return response
    } catch (error) {
       
        console.error('Unauthorized access:', error);
    }
}

export default GetAllUsers




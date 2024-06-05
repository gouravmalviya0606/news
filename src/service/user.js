import axios from "axios";

const api_url = "http://localhost:5000";

export const loginUser = async (data) => {
    let response;
    try {
        response = await axios.post(`${api_url}/login`,{data});
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        console.log(response);
        return error.response.data;
        // throw error;
    }
}
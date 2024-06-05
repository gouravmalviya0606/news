import axios from "axios";

const api_url = "http://localhost:5000";

export const getAllNews = async () => {
    try {
        const response = await axios.get(`${api_url}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        throw error;
    }
}

export const getAdminNews = async (token) => {
    try {
        const response = await axios.post(`${api_url}/getAdminNews`,{token});
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        return error.response.data;
    }
}

export const getDetailsForAddNews = async () => {
    try {
        const response = await axios.get(`${api_url}/getDetailsForAddNews`);
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        throw error;
    }
}

export const addNewNews = async (data) => {
    console.log(data);
    try {
        const response = await axios.post(`${api_url}/addNewNews`,data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching beers:', error);
        return error.response.data;
    }
}
import axios from "axios";

const ApiRequest = async (method, endpoint, data = {}, params = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let apiURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080/taskManager";

            axios.defaults.withCredentials = true;
            const response = await axios({
                method,
                url: `${apiURL}/${endpoint}`,
                data,
                params,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            

            resolve(response.data);
        } catch (error) {
            console.error(`API Error [${method} ${endpoint}]:`, error.response?.data || error.message);
            reject(error);
        }
    });
};

export default ApiRequest;

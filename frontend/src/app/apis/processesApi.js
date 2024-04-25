import { API, handleApiError } from "../../utils/api";

export const addProcess = async (process) => {
    try {
        const response = await API.post('/api/v1/processes/create', process, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchAllProcessByClientId = async (clientId) => {
    try {
        const response = await API.get(`/api/v1/processes/client/${clientId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchProcessById = async (processId) => {
    try {
        const response = await API.get(`/api/v1/processes/${processId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateProcess = async (process) => {
    try {
        const response = await API.put(`/api/v1/processes/update/${process._id}`, process, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

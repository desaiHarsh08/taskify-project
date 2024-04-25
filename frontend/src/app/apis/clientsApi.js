import { API, handleApiError } from "../../utils/api";

export const addClient = async (client) => {
    try {
        const response = await API.post('/api/v1/clients/create', client, {
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

export const fetchAllClients = async () => {
    try {
        const response = await API.get('/api/v1/clients/');
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const fetchClientById = async (clientId) => {
    try {
        const response = await API.get(`/api/v1/clients/${clientId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateClient = async (client) => {
    console.log(client)
    try {
        const response = await API.put(`/api/v1/clients/update/${client._id}`, client, {
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

import { API, handleApiError } from "../../utils/api";

export const addTask = async (task) => {
    try {
        const response = await API.post('/api/v1/tasks/create', task, {
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

export const fetchTasksByProcessId = async (processId) => {
    try {
        const response = await API.get(`/api/v1/tasks/process/${processId}`);
        return { error: null, data: response.data }
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

export const updateTask = async (task) => {
    try {
        const response = await API.put(`/api/v1/tasks/update/${task._id}`, task, {
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

import axiosInstance from "../config/axiosConfig";


const TASK_URL = "/tasks"

const TaskService = {
    getAll : async ()=> {
        try {
            const response = await axiosInstance.get(
                `${TASK_URL}`
            );
            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erreur du serveur. Réessayez plus tard.");

        }
    }
}

export default TaskService;
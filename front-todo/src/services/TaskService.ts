import axiosInstance from "../config/axiosConfig";
import {Task} from "../models/Task";


const TASK_URL = "/tasks"

const TaskService = {
    getAll : async ():Promise<Task[]>=> {
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
    },
    saveTask: async (task:Task) =>{
        try {
            const response = await axiosInstance.post(
                `${TASK_URL}`, task);
            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erreur du serveur. Réessayez plus tard.");

        }
    },
    deleteByUuid: async (uuid:string)=>{
        try {
            const response = await axiosInstance.delete(
                `${TASK_URL}/${uuid}`);
            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erreur du serveur. Réessayez plus tard.");

        }
    },
    updateByUuid: async (task:Task) =>{
        try {
            const response = await axiosInstance.put(
                `${TASK_URL}`,task);
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
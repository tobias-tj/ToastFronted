import axios from "axios";

const API_URL_TASKS = "http://localhost:8080/tasks"
const API_URL_USERS = "http://localhost:8080/users"


export async function saveTask(task){
    return await axios.post(`${API_URL_TASKS}`, task);
}

export async function patchTask(task){
    return await axios.patch(`${API_URL_TASKS}/${task.id}`, task)
}

export async function getTasks(page = 0, size = 10){
    return await axios.get(`${API_URL_TASKS}?page=${page}&size=${size}`);
}

export async function getTask(id){
    return await axios.get(`${API_URL_TASKS}/${id}`);
}

export async function getUsers(){
    return await axios.get(`${API_URL_USERS}`);
}

import axios from "axios";
import exp from "constants";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API_KEY": "314b0124-4f3e-420a-9aac-2a8ba6dd682b"
    }
});

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TasksType = {
    description?: string
    title?: string
    completed?: boolean
    status?: string
    priority?: number
    startDate?: string
    deadline?: string
    id?: string
    todoListId?: string
    order?: number
    addedDate?: string
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}


export const todolistApi = {
    getTodolist() {
        return instance.get(`/todo-lists`)
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    }
}
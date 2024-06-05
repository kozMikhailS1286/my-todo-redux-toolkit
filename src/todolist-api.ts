import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "314b0124-4f3e-420a-9aac-2a8ba6dd682b"
    }
});

instance.interceptors.request.use(function (config) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("sn-token");

    return config;
});


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TasksType = {
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

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TasksType[];
};

type DelResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post(`/auth/login`, data)
    }
}

export const todolistApi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTodolist(title: string) {
        console.log("Add todo API: " + title)
        return instance.post(`/todo-lists`, {title})
    },
    delTodolist(todolistId: string) {
        return instance.delete<DelResponseType>(`/todo-lists/${todolistId}`)
    },
    // delTask(taskId: string, todolistId: string) {
    //     return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    // }
}
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
    todoListId: string
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


export type AddTodolistResponseType = {
    resultCode: number
    message: Array<string>
    data: {item: TodolistType}
}

export type AddTaskResponseType = {
    resultCode: number
    message: Array<string>
    data: {item: TasksType}
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
    createTodo(title: string) {
        return instance.post<AddTodolistResponseType>(`/todo-lists`, {title})
    },
    createTask(todolistId: string, title: string) {
        console.log("create task API")
        return instance.post<AddTaskResponseType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodolist(todolistId: string) {
        console.log("del Todo in API")
        return instance.delete<DelResponseType>(`/todo-lists/${todolistId}`)
    }
}
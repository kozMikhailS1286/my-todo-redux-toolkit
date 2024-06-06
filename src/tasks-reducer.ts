import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TasksStateType, TasksType, todolistApi} from "./todolist-api";
import {AppThunk} from "./store";

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        setTasks: (state, action: PayloadAction<{ tasks: Array<TasksType>; todolistId: string }>) => {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        },
        addTask: (state, action: PayloadAction<{task: TasksType}>) => {
            let task = state[action.payload.task.todoListId]
            task.unshift(action.payload.task)
        }
    }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions


export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(tasksAction.setTasks({tasks, todolistId}))
            })
    }
}

export const addTaskT = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                console.log("Add Task TC")
                dispatch(tasksAction.addTask({task: res.data.data.item}))
            })
    }
}
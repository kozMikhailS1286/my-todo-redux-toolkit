import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TasksStateType, TasksType, todolistApi} from "./todolist-api";
import {AppThunk} from "./store";

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        setTasks: (state, action: PayloadAction<{tasks: Array<TasksType>; todolistId: string}>) => {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
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
import {createSlice} from "@reduxjs/toolkit";
import {todolistApi, TodolistType} from "./todolist-api";
import {AppThunk} from "./store";


export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistType[],
    reducers: {
        setTodolists: (state, action) => {
            return action.payload.todolist.map((tl: any) => ({...tl}))
        }
    }
})


export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(todolistsActions.setTodolists({todolists: res.data}))
            })
    }
}
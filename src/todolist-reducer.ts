import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todolistApi, TodolistType} from "./todolist-api";


export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistType[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolist.map((tl) => ({...tl}))
        })
        builder.addCase(createTodoTC.fulfilled, (state, action) => {
            return [{...action.payload.todolist}, ...state]
        })
        builder.addCase(delTodoTC.fulfilled, (state, action) => {
            return state.filter((tl) => tl.id !== action.payload.id)
        })
    }
})


export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions



export const fetchTodolistsTC = createAsyncThunk<{todolist: TodolistType[]} , void>(
    "todolist/fetchtodolist",
    async () => {
        const res = await todolistApi.getTodolist()
        return {todolist: res.data}
    }
)


export const createTodoTC = createAsyncThunk<{ todolist: TodolistType}, string>(
    "todolist/addTodo",
    async (title) => {
        const res = await todolistApi.createTodo(title)
        return {todolist: res.data.data.item}
    }
)


export const delTodoTC = createAsyncThunk<{id: string}, string>(
    "todolist/delTodo",
    async (todolistId) => {
        console.log("del todo in TC")
        const res = await todolistApi.deleteTodolist(todolistId)
        return {id: todolistId}
    }
)
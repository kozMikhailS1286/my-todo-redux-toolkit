import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistApi, TodolistType} from "./todolist-api";
import {AppThunk} from "./store";


export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistType[],
    reducers: {
        setTodolists: (state, action: PayloadAction<{todolist: TodolistType[]}>) => {
            return action.payload.todolist.map((tl) => ({ ...tl}))
        },
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter((tl) => tl.id !== action.payload.id)
        },
        addTodo: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            return [{...action.payload.todolist}, ...state]
        }
    }
})


export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions


export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(todolistsActions.setTodolists({todolist: res.data}))

            })
            .catch((error) => console.log({error}))
    }
}

export const addTodoT = (title: string): AppThunk => {
    return (dispatch) => {
        todolistApi.addTodoAPI(title)
            .then((res) => {
                dispatch(todolistsActions.addTodo({todolist: res.data.data.item}))

            })
    }
}

export const removeTodolist = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistApi.delTodolist(todolistId)
            .then((res) => {
                dispatch(todolistsActions.removeTodolist({id: todolistId}))
            })
    }
}
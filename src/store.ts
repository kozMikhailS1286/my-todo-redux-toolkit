import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolist-reducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import {tasksReducer} from "./tasks-reducer";
import {useDispatch} from "react-redux";
import App from "./App";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType=void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()


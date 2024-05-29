import {createSlice} from "@reduxjs/toolkit";
import {AppThunk} from "./store";
import {authAPI, LoginParamsType} from "./todolist-api";

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            return action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions


export const login = (data: LoginParamsType): AppThunk =>
    (dispatch) => {
    authAPI.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                // достаём из ответа ещё и токен
                let {id, login, email, token} = response.data.data;
                // сохраняем это токен в localStorage (погуглите, что это)
                localStorage.setItem("sn-token", token);
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
            }
        });
};
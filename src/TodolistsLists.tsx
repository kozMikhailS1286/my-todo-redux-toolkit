import React, {ChangeEvent, useEffect, useState} from 'react'
import Todolist from "./Todolist";
import {useSelector} from "react-redux";
import {createTodoTC, fetchTodolistsTC} from "./todolist-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TodolistType} from "./todolist-api";
import s from './TodolistsLists.module.css'
import {Navigate} from "react-router-dom";
import {logoutTC} from "./auth-reducer";

const TodolistsLists = () => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
            dispatch(fetchTodolistsTC())
    }, [dispatch])

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addTodo = (title: string) => {
        if (title.trim() !== "") {
            dispatch(createTodoTC(title))
            setTitle("")
        } else {
            setError("Enter your title")
        }
    }

    const logout = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <div className={s.todolist}>
        <h3> My todo Redux Toolkit: </h3>
        <button onClick={logout}> Logout </button>
        <input onChange={changeTitle} value={title}/>
        <button onClick={()=>addTodo(title)}> Add Todo </button>
        <h4> {error} </h4>
        {
            todolists.map((tl) => {

                return (
                    <Todolist   key={tl.id}
                                todolist={tl}
                    />
                )
            })
        }
    </div>
}

export default TodolistsLists;
import React, {ChangeEvent, useEffect, useState} from 'react'
import Todolist from "./Todolist";
import {useSelector} from "react-redux";
import {addTodolistT, fetchTodolistsTC} from "./todolist-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TodolistType} from "./todolist-api";
import s from './TodolistsLists.module.css'

const TodolistsLists = () => {

    const [title, setTitle] = useState("")

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const changeTodolistTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTodolist = (todoTitle: string) => {
        console.log("add in component: " + todoTitle)
        dispatch(addTodolistT(todoTitle))
    }

    return <div className={s.todolist}>
        <h3> My todo Redux Toolkit: </h3>
        <input onChange={changeTodolistTitle} value={title}/>
        <button onClick={()=>addTodolist(title)}> Add Todo </button>
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
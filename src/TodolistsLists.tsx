import React, {useEffect} from 'react'
import Todolist from "./Todolist";
import {useSelector} from "react-redux";
import {fetchTodolistsTC} from "./todolist-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TodolistType} from "./todolist-api";

const TodolistsLists = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    return <div>
        <h3> My todo Redux Toolkit: </h3>
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
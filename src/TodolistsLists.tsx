import React, {useEffect} from 'react'
import Todolist from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodolistsTC} from "./todolist-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TasksStateType, TodolistType} from "./todolist-api";

const TodolistsLists = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return <div>
        <h3> My todo Redux Toolkit: </h3>
        {
            todolists.map((tl) => {
                let allTasks = tasks[tl.id]
                return (
                    <Todolist   key={tl.id}
                                todolist={tl}
                                tasks={allTasks}
                    />
                )
            })
        }
    </div>
}

export default TodolistsLists;
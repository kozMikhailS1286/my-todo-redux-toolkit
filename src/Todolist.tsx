import React, {useEffect} from "react";
import Task from "./Task";
import {fetchTasksTC} from "./tasks-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TasksType, TodolistType} from "./todolist-api";
import {useSelector} from "react-redux";
import s from './Todolist.module.css'
import {removeTodolist} from "./todolist-reducer";


type Props = {
    todolist: TodolistType
}


const Todolist = (props: Props) => {

    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todolist.id])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const removeTodo = (todolistId: string) => {
        dispatch(removeTodolist(todolistId))
    }

    return (<div className={s.todolist}>
        {props.todolist.title}
        <button onClick={()=>removeTodo(props.todolist.id)}> Del todo </button>
        {tasks?.map((t: TasksType) => (
            <Task
                key={t.id}
                task={t}
            />
        ))}

    </div>)
}

export default Todolist;
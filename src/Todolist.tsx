import React, {ChangeEvent, useEffect, useState} from "react";
import Task from "./Task";
import {addTaskT, fetchTasksTC} from "./tasks-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TasksType, TodolistType} from "./todolist-api";
import {useSelector} from "react-redux";
import s from './Todolist.module.css'
import {delTodoTC} from "./todolist-reducer";


type Props = {
    todolist: TodolistType
}


const Todolist = (props: Props) => {

    const [title, setTitle] = useState("")

    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todolist.id])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    const addTask = (todolistId: string, taskTitle: string) => {
        console.log("Add Task")
        dispatch(addTaskT(todolistId, taskTitle))
    }

    const delTodo = (todolistId: string) => {
        console.log("del Todo in component")
        dispatch(delTodoTC(todolistId))
    }

    return (<div className={s.todolist}>
        {props.todolist.title}
        <input onChange={changeTitle} title={title}/>
        <button onClick={()=>addTask(props.todolist.id, title)}> Add Task </button>

        {tasks?.map((t: TasksType) => (
            <Task
                key={t.id}
                task={t}
            />
        ))}
        <button onClick={()=>delTodo(props.todolist.id)}> Del todo </button>
    </div>)
}

export default Todolist;
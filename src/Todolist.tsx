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
    const [error, setError] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todolist.id])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }



    const addTask = (todolistId: string, taskTitle: string) => {
        if (title.trim() !== "") {
            console.log("Add Task")
            dispatch(addTaskT(todolistId, taskTitle))
            setTitle("")
        } else {
            setError("Enter your title")
        }
    }

    const delTodo = (todolistId: string) => {
        console.log("del Todo in component")
        dispatch(delTodoTC(todolistId))
    }

    return (<div className={s.todolist}>
        {props.todolist.title}
        <input onChange={changeTitle} value={title}/>
        <button onClick={()=>addTask(props.todolist.id, title)}> Add Task </button>
        <h4> {error} </h4>

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
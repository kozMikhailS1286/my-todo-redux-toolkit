import React, {useEffect} from "react";
import Task from "./Task";
import {fetchTasksTC} from "./tasks-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {TasksType, TodolistType} from "./todolist-api";
import {useSelector} from "react-redux";


type Props = {
    todolist: TodolistType
}


const Todolist = (props: Props) => {

    const dispatch = useAppDispatch()

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todolist.id])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    return (<div>
        {props.todolist.title}
        {tasks?.map((t: TasksType) => (
            <Task
                key={t.id}
                task={t}
            />
        ))}

    </div>)
}

export default Todolist;
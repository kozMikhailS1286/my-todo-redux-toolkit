import React from "react";
import {TasksType} from "./todolist-api";
import s from "./Task.module.css"

type Props = {
    task: TasksType
}


const Task = (props: Props) => {
    return <div className={s.task} key={props.task.id}>
        {props.task.title}
    </div>
}

export default Task;
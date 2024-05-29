import React from "react";
import {TasksType} from "./todolist-api";

type Props = {
    task: TasksType
}


const Task = (props: Props) => {
    return <div key={props.task.id}>
        {props.task.title}
    </div>
}

export default Task;
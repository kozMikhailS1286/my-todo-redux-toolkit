import React, {useEffect} from "react";
import Task from "./Task";
import {fetchTasksTC} from "./tasks-reducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "./store";


type Props = {
    todolist: any
    tasks: any
}


const Todolist = (props: Props) => {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    return <div>
        {props.tasks.map((t: any) => (
            <Task
                key={t.id}
                task={t}
            />
        ))}

    </div>
}

export default Todolist;
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TasksStateType, TasksType, todolistApi} from "./todolist-api";
import {AppThunk} from "./store";
import {createTodoTC} from "./todolist-reducer";

export const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        // setTasks: (state, action: PayloadAction<{ tasks: Array<TasksType>; todolistId: string }>) => {
        //     return {...state, [action.payload.todolistId]: action.payload.tasks}
        // },
        addTask: (state, action: PayloadAction<{task: TasksType}>) => {
            let task = state[action.payload.task.todoListId]
            task.unshift(action.payload.task)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            return {...state, [action.payload.todolistId]: action.payload.task}
        })
    }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions


// export const fetchTasksTC = (todolistId: string): AppThunk => {
//     return (dispatch) => {
//         todolistApi.getTasks(todolistId)
//             .then((res) => {
//                 const tasks = res.data.items
//                 dispatch(tasksAction.setTasks({tasks, todolistId}))
//             })
//     }
// }

export const fetchTasksTC = createAsyncThunk<{task: TasksType[], todolistId: string}, string>(
    "task/fetchTask",
    async (todolistId) => {
        const res = await todolistApi.getTasks(todolistId)
        return {task: res.data.items, todolistId}
    }
)

export const addTaskT = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                console.log("Add Task TC")
                dispatch(tasksAction.addTask({task: res.data.data.item}))
            })
    }
}
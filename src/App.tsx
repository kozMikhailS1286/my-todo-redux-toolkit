import React, {useEffect} from 'react';
import TodolistsLists from "./TodolistsLists";
import {Route, Routes} from "react-router-dom";
import Form from "./Login";
import {initializedApp} from "./auth-reducer";
import {useAppDispatch} from "./store";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedApp());
    }, []);




    return (
        <div>
            <Routes>
                <Route path={"/"} element={ <TodolistsLists/> } />
                <Route path={"/login"} element={ <Form/> } />
            </Routes>
        </div>
    );
}

export default App;

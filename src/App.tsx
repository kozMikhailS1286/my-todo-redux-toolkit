import React from 'react';
import TodolistsLists from "./TodolistsLists";
import {Route, Routes} from "react-router-dom";
import Form from "./Login";

function App() {

    // const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

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

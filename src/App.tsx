import React from 'react';
import TodolistsLists from "./TodolistsLists";
import {Route, Routes} from "react-router-dom";
// import {useSelector} from "react-redux";
// import {AppRootStateType} from "./store";

function App() {

    // const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    return (
        <div>
            <Routes>
                <Route path={"/"} element={ <TodolistsLists/> } />
            </Routes>
        </div>
    );
}

export default App;

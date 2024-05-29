import React from 'react';
import TodolistsLists from "./TodolistsLists";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={ <TodolistsLists/> } />
            </Routes>
        </div>
    );
}

export default App;

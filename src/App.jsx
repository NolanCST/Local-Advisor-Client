import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/logout",
            element: <Logout />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

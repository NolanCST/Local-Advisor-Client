import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./register/Register";
import Login from "./login/Login";
// import Home from "./components/home/Home";

function App() {
    const router = createBrowserRouter([
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        // {
        //     path: "/",
        //     element: <Home />,
        // },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

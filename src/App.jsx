import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Profile from "./Profile/profile";
import DetailsPlace from "./components/home/DetailsPlace";
import CreatePlaces from "./components/home/CreatePlaces";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import ModifyPlace from "./components/home/modifyPlace";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/DetailsPlace/:id",
            element: <DetailsPlace />,
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
            path: "/create",
            element: <CreatePlaces />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/modifyPlace",
            element: <ModifyPlace />,
        },
        {
            path: "/forgotPassword",
            element: <ForgotPassword />,
        },
        {
            path: "/resetPasswordPage",
            element: <ResetPasswordPage />,
        },
        {
            path: "/reset-password/:token",
            exact: true,
            component: ResetPasswordPage,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

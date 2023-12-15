import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import Profile from "./Profile/profile";
import DetailsPlace from "./components/home/DetailsPlace";
import CreatePlaces from "./components/home/CreatePlaces";
import ForgotPassword from "./components/forgotPassword/forgotPassword"

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
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

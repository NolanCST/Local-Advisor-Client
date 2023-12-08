import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

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
   ]);
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}

export default App;

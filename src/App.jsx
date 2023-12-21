import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Profile from "./components/Profile/Profile";
import DetailsPlace from "./components/home/DetailsPlace";
import CreatePlaces from "./components/home/CreatePlaces";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import ModifyPlace from "./components/home/modifyPlace";
import { StatusProvider } from "./components/status/StatusContext";

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
         path: "/modifyPlace/:id",
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
         <StatusProvider>
            <RouterProvider router={router} />
         </StatusProvider>
      </>
   );
}

export default App;

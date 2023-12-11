import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CreatePlaces from "./CreatePlaces";

function App() {
  const router = createBrowserRouter([
    //  {
    //    path: "/",
    //    element: <Home />,
    //  },

    {
      path: "/create",
      element: <CreatePlaces />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

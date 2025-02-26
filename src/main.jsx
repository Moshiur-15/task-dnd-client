import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import Update from './Components/Update.jsx'
import Login from "./Components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./provider/AuthContex.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/edit/:id",
    element: <Update/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>

      <RouterProvider router={router}> </RouterProvider>
    </AuthContext>

    <Toaster />
  </StrictMode>
);

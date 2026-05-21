import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../pages/layouts/AuthLayout";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import HomeLayout from "../pages/layouts/HomeLayout";
import HomePage from "../pages/Home";

const AppRouter = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    },
    {
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }
        ]
    }
])

export default AppRouter
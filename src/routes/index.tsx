import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../pages/layouts/AuthLayout";
import HomeLayout from "../pages/layouts/HomeLayout";
import { lazy } from "react";
import { ProtectedRoute, PublicRoute } from "../services/AuthGuard";


const LoginPage = lazy(() => import("../pages/Login"))
const RegisterPage = lazy(() => import("../pages/Register"))
const HomePage = lazy(() => import("../pages/Home"))
const TopUpPage = lazy(() => import("../pages/TopUp"))
const ServicesPage = lazy(() => import("../pages/Services"))
const TransactionPage = lazy(() => import("../pages/Transaction"))
const AccountPage = lazy(() => import("../pages/AccountPage"))
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"))

const AppRouter = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
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
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <HomeLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    },
                    {
                        path: "/top-up",
                        element: <TopUpPage />
                    },
                    {
                        path: "/services/:serviceId",
                        element: <ServicesPage />
                    },
                    {
                        path: "/transaction",
                        element: <TransactionPage />
                    },
                    {
                        path: "/account",
                        element: <AccountPage />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])

export default AppRouter
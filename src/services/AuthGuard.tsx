import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export const ProtectedRoute = () => {
    const location = useLocation();
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)

    if (!isAuthenticated || !token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />
}

export const PublicRoute = () => {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)
    if (isAuthenticated && token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}
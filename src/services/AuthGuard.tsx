import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../stores";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated || !token) {
            navigate("/login")
        }
    }, [isAuthenticated, token])

    return (isAuthenticated && token) && children
}

export default AuthGuard
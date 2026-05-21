import { Link, useOutletContext } from "react-router-dom"
import LoginForm from "../components/form/LoginForm"
import type { outletAuthContext } from "../types/outletAuthContext"

const LoginPage = () => {
    const { setToastErr } = useOutletContext<outletAuthContext>()

    const onSubmitForm = () => {
        setToastErr({
            message: "wrong error",
            type: "error"
        });
    }
    return (
        <div className="space-y-10">
            <h1 className="text-center font-medium text-3xl">Masuk atau buat akun untuk memulai</h1>
            <LoginForm
                onSubmit={onSubmitForm}
            />
            <p className="text-center text-xs text-gray-400 mt-6">
                belum punya akun? registrasi{' '}
                <Link to={"/register"} className="text-[#f02c1c] font-bold hover:underline">di sini</Link>
            </p>
        </div>
    )
}

export default LoginPage
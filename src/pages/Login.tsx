import { Link, useOutletContext } from "react-router-dom"
import LoginForm from "../components/form/LoginForm"
import type { outletAuthContext } from "../types/outletAuthContext"
import { useLoginAuthMutation } from "../api/authApi"
import type { loginSchemaType } from "../components/form/validations/loginSchema"
import { useEffect } from "react"

const LoginPage = () => {
    const { setToastErr } = useOutletContext<outletAuthContext>()
    const [loginAuth, { isLoading }] = useLoginAuthMutation()

    const onSubmitForm = async (data: loginSchemaType) => {

        try {
            const resData = await loginAuth(data).unwrap()
            if (resData.data) {
                setToastErr({
                    message: resData.message,
                    type: "success"
                })
            }
        } catch (error: any) {
            console.error(error)
            const serverMessage = error?.data?.message || "Terjadi suatu kesalahan";
            setToastErr({
                message: serverMessage,
                type: "error"
            });
        }
    }

    useEffect(() => {
        document.title = "Login | SIMS PPOB-Rayhan Febriyan Saputra";
    }, []);

    return (
        <div className="space-y-10">
            <h1 className="text-center font-medium text-3xl">Masuk atau buat akun untuk memulai</h1>
            <LoginForm
                onSubmit={onSubmitForm}
                disabled={isLoading}
            />
            <p className="text-center text-xs text-gray-400 mt-6">
                belum punya akun? registrasi{' '}
                <Link to={"/register"} className="text-[#f02c1c] font-bold hover:underline">di sini</Link>
            </p>
        </div>
    )
}

export default LoginPage
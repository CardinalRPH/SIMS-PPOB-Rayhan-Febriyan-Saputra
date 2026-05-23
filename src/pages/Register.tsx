import { Link, useNavigate, useOutletContext } from "react-router-dom"
import RegisterForm from "../components/form/RegisterForm"
import type { registerSchemaType } from "../components/form/validations/registerSchema"
import type { outletAuthContext } from "../types/outletAuthContext"
import { useRegisterAuthMutation } from "../api/authApi"
import { useEffect } from "react"

const RegisterPage = () => {
    const { setToastErr } = useOutletContext<outletAuthContext>()
    const [createAuth, { isLoading }] = useRegisterAuthMutation()
    const navigate = useNavigate()
    const onSubmitForm = async (data: registerSchemaType) => {
        try {
            const resData = await createAuth(data).unwrap()
            if (resData) {
                setToastErr({
                    message: resData.message,
                    type: "success"
                })
                navigate("/login")
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
        document.title = "Register | SIMS PPOB-Rayhan Febriyan Saputra";
    }, []);

    return (
        <div className="space-y-10">
            <h1 className="text-center font-medium text-3xl">Lengkapi data untuk membuat akun</h1>
            <RegisterForm
                disabled={isLoading}
                onSubmit={onSubmitForm}
            />
            <p className="text-center text-xs text-gray-400 mt-6">
                sudah punya akun? login{' '}
                <Link to={"/login"} className="text-[#f02c1c] font-bold hover:underline">di sini</Link>
            </p>
        </div>
    )

}

export default RegisterPage
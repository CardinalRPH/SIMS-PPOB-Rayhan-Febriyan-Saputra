import { Link } from "react-router-dom"
import RegisterForm from "../components/form/RegisterForm"
import type { registerSchemaType } from "../components/form/validations/registerSchema"

const RegisterPage = () => {

    const onSubmitForm = (data: registerSchemaType) => {
        console.log(data)
    }

    return (
        <div className="space-y-10">
            <h1 className="text-center font-medium text-3xl">Lengkapi data untuk membuat akun</h1>
            <RegisterForm
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
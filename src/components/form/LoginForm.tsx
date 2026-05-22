import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema, type loginSchemaType } from "./validations/loginSchema"
import TextField from "./fields/TextField"
import PasswordField from "./fields/PasswordField"
import { BsAt } from "react-icons/bs"
import RedButton from "../RedButton"

type LoginFormType = {
    onSubmit: (data:loginSchemaType) => void
}

const LoginForm = ({ onSubmit }: LoginFormType) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-10">
            <div>
                <TextField
                    icon={<BsAt />}
                    placeholder="masukan email anda"
                    {...register('email')}
                    error={errors.email}
                />
                <PasswordField
                    placeholder="masukan password anda"
                    {...register('password', { required: true })}
                    error={errors.password}
                />
            </div>
            <RedButton type="submit">Masuk</RedButton>
        </form>
    )

}

export default LoginForm
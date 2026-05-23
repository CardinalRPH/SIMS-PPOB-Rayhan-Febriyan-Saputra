import { BsAt } from "react-icons/bs"
import PasswordField from "./fields/PasswordField"
import TextField from "./fields/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema, type registerSchemaType } from "./validations/registerSchema"
import RedButton from "../RedButton"

type RegisterFormType = {
    onSubmit: (data: registerSchemaType) => void
    disabled: boolean
}


const RegisterForm = ({ onSubmit, disabled }: RegisterFormType) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-10">
            <div>
                <TextField
                    icon={<BsAt />}
                    placeholder="masukan email anda"
                    {...register('email', { required: true })}
                    error={errors.email}
                />
                <TextField
                    icon={<BsAt />}
                    placeholder="nama depan"
                    {...register('first_name', { required: true })}
                    error={errors.first_name}
                />
                <TextField
                    icon={<BsAt />}
                    placeholder="nama belakang"
                    {...register('last_name', { required: true })}
                    error={errors.last_name}
                />
                <PasswordField
                    placeholder="buat password"
                    {...register('password', { required: true })}
                    error={errors.password}
                />
                <PasswordField
                    placeholder="konfirmasi password"
                    {...register('confirmPass', { required: true })}
                    error={errors.confirmPass}
                />
            </div>
            <RedButton disabled={disabled} type="submit">Registrasi</RedButton>
        </form>
    )
}

export default RegisterForm
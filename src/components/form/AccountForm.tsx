import { BsAt, BsPerson } from "react-icons/bs";
import TextField from "./fields/TextField";
import RedButton from "../RedButton";
import { updateProfileSchema, type updateProfileSchemaType } from "./validations/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProfileGetResponseType } from "../../dto/membership.dto";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type AccountFormType = {
    onSubmit: (data: updateProfileSchemaType) => void
    disabled: boolean
    isEditing: boolean
    profileResponse: ProfileGetResponseType | null | undefined
    setEditMode: Dispatch<SetStateAction<boolean>>
    handleLogout: () => void

}

const AccountForm = ({ disabled, onSubmit, isEditing, profileResponse, setEditMode, handleLogout }: AccountFormType) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateProfileSchema)
    })

    useEffect(() => {
        if (profileResponse) {
            reset({
                first_name: profileResponse.first_name,
                last_name: profileResponse.last_name,
            });
        }
    }, [profileResponse, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <TextField
                    value={profileResponse?.email}
                    icon={<BsAt />}
                    placeholder="email@nutech.com"
                    disabled={true}
                    className="bg-gray-50/50 cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Depan</label>
                <TextField
                    {...register("first_name")}
                    icon={<BsPerson />}
                    placeholder="Nama Depan Anda"
                    disabled={disabled || !isEditing}
                    error={errors.first_name}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Belakang</label>
                <TextField
                    {...register("last_name")}
                    icon={<BsPerson />}
                    placeholder="Nama Belakang Anda"
                    disabled={disabled || !isEditing}
                    error={errors.last_name}
                />
            </div>


            <div className="pt-4 space-y-4">
                {isEditing ? (
                    <>
                        <RedButton type="submit" key="btn-save" disabled={disabled}>
                            {disabled ? "Menyimpan..." : "Simpan Perubahan"}
                        </RedButton>
                        <button
                            key="btn-cancel"
                            type="button"
                            onClick={() => {
                                setEditMode(false);
                                if (profileResponse) {
                                    reset({
                                        first_name: profileResponse.first_name,
                                        last_name: profileResponse.last_name,
                                    });
                                }
                            }}
                            className="w-full py-3 border border-[#f02c1c] text-[#f02c1c] rounded-md text-sm font-semibold hover:bg-red-50/30 transition-all cursor-pointer text-center"
                        >
                            Batalkan
                        </button>
                    </>
                ) : (
                    <>
                        <RedButton key="btn-edit" type="button" onClick={() => setEditMode(true)}>
                            Edit Profile
                        </RedButton>
                        <button
                            key="btn-logout"
                            type="button"
                            onClick={handleLogout}
                            className="w-full py-3 border border-[#f02c1c] text-[#f02c1c] rounded-md text-sm font-semibold hover:bg-red-50/30 transition-all cursor-pointer text-center"
                        >
                            Logout
                        </button>


                    </>
                )}
            </div>
        </form>
    )
}

export default AccountForm
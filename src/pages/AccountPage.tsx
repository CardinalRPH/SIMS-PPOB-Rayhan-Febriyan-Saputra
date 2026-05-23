import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { useGetProfileQuery, useUpdateProfileImageMutation, useUpdateProfileMutation } from "../api/profileApi";
import type { updateProfileSchemaType } from "../components/form/validations/profileSchema";
import Toast from "../components/AuthToast";
import AccountForm from "../components/form/AccountForm";
import AccountFormSkeleton from "../components/skeleton/AccountFormSkeleton";
import { useDispatch } from "react-redux";
import { authAction } from "../stores/authState";
import profileDummy from "../assets/images/profilePhoto.png"
import getServerErrorWithStatus from "../utils/errorCast";

const AccountPage = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const dispatch = useDispatch()

    const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [updateAvatar, { isLoading: isUpdatingAvatar }] = useUpdateProfileImageMutation();

    const onSubmit = async (data: updateProfileSchemaType) => {
        try {
            const responseData = await updateProfile({
                first_name: data.first_name,
                last_name: data.last_name,
            }).unwrap();

            setToast({ message: responseData.message, type: "success" });
            setIsEditMode(false);
        } catch (err: unknown) {
            const serverError = getServerErrorWithStatus(err);

            const errorMessage = serverError?.message || "Gagal memperbarui profil.";
            if (serverError?.status === 108) {
                setToast({
                    message: errorMessage,
                    type: "error",
                });

                setTimeout(() => {
                    dispatch(authAction.logout());
                }, 2000);

                return;
            }
            setToast({
                message: errorMessage,
                type: "error",
            });
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 100 * 1024) {
            setToast({ message: "Ukuran file maksimal 100 KB", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const responseData = await updateAvatar(formData).unwrap();
            setToast({ message: responseData.message, type: "success" });
        } catch (err: any) {
            const serverError = getServerErrorWithStatus(err);
            const errorMessage = serverError?.message || "Gagal memperbarui foto profil.";
            if (serverError?.status === 108) {
                setToast({
                    message: errorMessage,
                    type: "error",
                });

                setTimeout(() => {
                    dispatch(authAction.logout());
                }, 2000);

                return;
            }
            setToast({
                message: errorMessage,
                type: "error",
            });

        }
    };

    const handleLogout = () => {
        dispatch(authAction.logout())
    };

    useEffect(() => {
        document.title = "Akun | SIMS PPOB-Rayhan Febriyan Saputra";
    }, []);

    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center mt-6">

            <div className="relative w-30 h-30 mb-4">
                <div className="w-full h-full rounded-full border border-gray-200 overflow-hidden bg-gray-50">
                    <img
                        src={profileData ? profileData.data.profile_image.includes("/take-home-test/null") ? profileDummy : profileData.data.profile_image : profileDummy}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                <label
                    htmlFor="avatar-input"
                    className={`absolute bottom-0 right-1 bg-white border border-gray-300 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-50 transition-all ${isUpdatingAvatar ? 'animate-spin' : ''}`}
                >
                    <BsPencil className="text-xs text-gray-600" />
                    <input
                        id="avatar-input"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleAvatarChange}
                        className="hidden"
                        disabled={isUpdatingAvatar}
                    />
                </label>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-10">
                {`${profileData?.data?.first_name || ""} ${profileData?.data?.last_name || ""}`}
            </h2>
            {profileLoading ? <AccountFormSkeleton /> :
                <AccountForm
                    disabled={isUpdatingProfile}
                    handleLogout={handleLogout}
                    isEditing={isEditMode}
                    onSubmit={onSubmit}
                    profileResponse={profileData?.data}
                    setEditMode={setIsEditMode}
                />}

            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    );
}

export default AccountPage
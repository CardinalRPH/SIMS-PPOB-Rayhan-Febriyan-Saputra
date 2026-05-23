import { useEffect, useRef, useState } from "react"
import { useGetProfileQuery } from "../api/profileApi"
import { useGetBalanceQuery, usePostTopUpMutation } from "../api/transactionApi"
import BalanceCard from "../components/BalanceCard"
import TopUpForm from "../components/form/TopUpForm"
import type { UseFormReset } from "react-hook-form"
import type { topUpSchemaType } from "../components/form/validations/transactionSchema"
import Toast from "../components/AuthToast"
import ConfirmationModal from "../components/ConfirmationModal"
import StatusModal from "../components/StatusModal"
import MiniProfileSkeleton from "../components/skeleton/MiniProfileSkeleton"
import ProfileSection from "../components/ProfileSection"
import getServerErrorWithStatus from "../utils/errorCast"
import { useDispatch } from "react-redux"
import { authAction } from "../stores/authState"

const TopUpPage = () => {
    const { data: balanceData, isError: balanceIsErr, error: balanceErr } = useGetBalanceQuery()
    const { data: profileData, isLoading: profileLoading, isError: profileIsErr, error: profileErr } = useGetProfileQuery()
    const [postTopUp, { isLoading: topUpLoading }] = usePostTopUpMutation()

    const resetFormRef = useRef<UseFormReset<topUpSchemaType> | null>(null);

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [confirmModal, setConfirmModal] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const [statusModalData, setStatusModalData] = useState<{ type: "success" | "error", title: string, message: string } | null>(null)
    const [amountVal, setAmountVal] = useState(0)
    const dispatch = useDispatch()


    const handleSubmit = (data: topUpSchemaType) => {
        setAmountVal(data.top_up_amount)
        setConfirmModal(true)

    }

    const handleConfirm = async () => {
        try {
            const resData = await postTopUp({ top_up_amount: amountVal }).unwrap()

            if (resData) {
                setConfirmModal(false)
                setStatusModalData({
                    message: resData.message,
                    title: `Top Up sebesar`,
                    type: "success"
                })
                if (resetFormRef.current) {
                    resetFormRef.current({
                        top_up_amount: 0
                    })
                }
                setStatusModal(true)
            }

        } catch (error: unknown) {
            const serverError = getServerErrorWithStatus(error);
            const serverMessage = serverError?.message || "Terjadi suatu kesalahan";

            setConfirmModal(false);

            if (serverError?.status === 108) {
                setStatusModalData({
                    message: serverMessage,
                    title: "Top Up sebesar",
                    type: "error"
                });
                setStatusModal(true);

                setTimeout(() => {
                    dispatch(authAction.logout());
                }, 2000);

                return;
            }

            setStatusModalData({
                message: serverMessage,
                title: "Top Up sebesar",
                type: "error"
            });
            setStatusModal(true);
        }

    }

    const handleCancelConfirm = () => {
        setConfirmModal(false)
    }

    useEffect(() => {
        const profileServerError = getServerErrorWithStatus(profileErr);
        const balanceServerError = getServerErrorWithStatus(balanceErr);

        if (profileServerError?.status === 108 || balanceServerError?.status === 108) {
            setToast({
                message: profileServerError?.message || balanceServerError?.message || "Sesi Anda telah berakhir.",
                type: "error",
            });

            setTimeout(() => {
                dispatch(authAction.logout());
            }, 2000);

            return;
        }

        if (profileIsErr) {
            setToast({
                message: profileServerError?.message || "Gagal memuat data profil pengguna.",
                type: "error",
            });
        } else if (balanceIsErr) {
            setToast({
                message: balanceServerError?.message || "Gagal memuat saldo akun Anda.",
                type: "error",
            });
        }

    }, [profileIsErr, balanceIsErr, profileErr, balanceErr, dispatch]);

    useEffect(() => {
        document.title = "Top Up | SIMS PPOB-Rayhan Febriyan Saputra";
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {profileLoading ? (
                    <MiniProfileSkeleton />
                ) : (
                    <ProfileSection profileData={profileData?.data} />
                )}

                <div className="col-span-12 md:col-span-7 w-full">
                    <BalanceCard balance={balanceData?.data.balance || 0} />
                </div>
                <div className="col-span-12 w-full">
                    <div className="mt-10">
                        <p className="text-sm text-gray-500 font-light">Silahkan masukan</p>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 -mt-1 mb-8">Nominal Top Up</h3>
                        <TopUpForm
                            resetVal={(resetFunc) => {
                                resetFormRef.current = resetFunc
                            }}
                            onSubmit={handleSubmit}
                            disabled={topUpLoading}
                        />
                    </div>
                </div>
            </div>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
            {confirmModal && (
                <ConfirmationModal amount={amountVal} isOpen={confirmModal} onClose={handleCancelConfirm} onConfirm={handleConfirm} title={`Anda yakin untuk TopUp sebesar`} isLoading={topUpLoading} />
            )}
            {statusModal && (
                <StatusModal amount={amountVal} isOpen={statusModal} onClose={() => { setStatusModal(false); setStatusModalData(null) }} status={statusModalData!.type} title={statusModalData!.title} errorMessage={statusModalData!.message} />
            )}
        </>
    )
}

export default TopUpPage
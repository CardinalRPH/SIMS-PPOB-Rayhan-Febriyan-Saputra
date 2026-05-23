import { BsCreditCard } from "react-icons/bs"
import { useGetProfileQuery } from "../api/profileApi"
import { useGetBalanceQuery, usePostCTransactionMutation } from "../api/transactionApi"
import BalanceCard from "../components/BalanceCard"
import { useGetServiceQuery } from "../api/informationApi"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import formatCurrency from "../utils/formaCurrency"
import RedButton from "../components/RedButton"
import Toast from "../components/AuthToast"
import ConfirmationModal from "../components/ConfirmationModal"
import StatusModal from "../components/StatusModal"
import MiniProfileSkeleton from "../components/skeleton/MiniProfileSkeleton"
import ProfileSection from "../components/ProfileSection"
import getServerErrorWithStatus from "../utils/errorCast"
import { useDispatch } from "react-redux"
import { authAction } from "../stores/authState"

const ServicesPage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [confirmModal, setConfirmModal] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const [statusModalData, setStatusModalData] = useState<{ type: "success" | "error", title: string, message: string } | null>(null)

    const { data: balanceData, isError: balanceIsErr, error: balanceErr } = useGetBalanceQuery()
    const { data: profileData, isLoading: profileLoading, isError: profileIsErr, error: profileErr } = useGetProfileQuery()
    const { data: servicesData, isLoading: serviceLoading, isError: isServErr, error: servErr } = useGetServiceQuery()
    const [postTransaction, { isLoading: ctLoading }] = usePostCTransactionMutation()
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const currentService = useMemo(() => {
        if (!servicesData?.data) return null;
        return servicesData.data.find(val => val.service_code === serviceId) || null;
    }, [servicesData, serviceId]);

    if (!serviceLoading && !currentService) {
        navigate("/not-found", { replace: true });
    }

    const handleConfrim = async () => {
        try {
            const resData = await postTransaction({ service_code: currentService!.service_code }).unwrap()

            if (resData) {
                setConfirmModal(false)
                setStatusModalData({
                    message: resData.message,
                    title: `Pembayaran ${resData.data.service_name} sebesar`,
                    type: "success"
                })
                setStatusModal(true)

            }
        } catch (error: unknown) {
            const serverError = getServerErrorWithStatus(error);
            const serverMessage = serverError?.message || "Terjadi suatu kesalahan";
            setConfirmModal(false);

            if (serverError?.status === 108) {
                setStatusModalData({
                    message: serverMessage,
                    title: `Pembayaran ${currentService!.service_name} sebesar`,
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
                title: `Pembayaran ${currentService!.service_name} sebesar`,
                type: "error"
            });
            setStatusModal(true);
        }
    }

    useEffect(() => {
        const profileServerError = getServerErrorWithStatus(profileErr);
        const balanceServerError = getServerErrorWithStatus(balanceErr);
        const servServerError = getServerErrorWithStatus(servErr);

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
        } else if (isServErr) {
            setToast({
                message: servServerError?.message || "Gagal memuat services.",
                type: "error",
            });
        }

    }, [isServErr, profileIsErr, balanceIsErr, profileErr, balanceErr, servErr, dispatch]);

    useEffect(() => {
        document.title = `${currentService?.service_name} | SIMS PPOB-Rayhan Febriyan Saputra`;
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 space-y-10 items-center">
                {profileLoading ? (
                    <MiniProfileSkeleton />
                ) : (
                    <ProfileSection profileData={profileData?.data} />
                )}

                <div className="col-span-12 md:col-span-7 w-full">
                    <BalanceCard balance={balanceData?.data.balance || 0} />
                </div>
                <div className="col-span-12 w-full space-y-10">
                    <div className="space-y-5">
                        <h3 className="text-xl font-normal">PemBayaran</h3>
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={currentService?.service_icon}
                                alt={currentService?.service_name}
                                className="w-6 h-6 object-contain"
                            />
                            <h3 className="text-base font-bold text-gray-800">
                                {currentService?.service_name}
                            </h3>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 text-base">
                            <BsCreditCard />
                        </div>
                        <div className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-700 font-medium outline-none select-none">
                            {formatCurrency(currentService?.service_tariff || 0)}
                        </div>
                    </div>
                    <RedButton onClick={() => setConfirmModal(true)}>Bayar</RedButton>
                </div>
            </div>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
            {confirmModal && (
                <ConfirmationModal amount={currentService?.service_tariff || 0} isOpen={confirmModal} onClose={() => setConfirmModal(false)} onConfirm={handleConfrim} title={`Beli ${currentService?.service_name} senilai`} isLoading={ctLoading} />
            )}
            {statusModal && (
                <StatusModal amount={currentService?.service_tariff || 0} isOpen={statusModal} onClose={() => { setStatusModal(false); setStatusModalData(null) }} status={statusModalData!.type} title={statusModalData!.title} errorMessage={statusModalData!.message} />
            )}
        </>
    )
}

export default ServicesPage
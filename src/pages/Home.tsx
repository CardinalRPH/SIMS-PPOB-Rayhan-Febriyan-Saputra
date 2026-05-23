import { useEffect, useState } from "react"
import { useGetBannerQuery, useGetServiceQuery } from "../api/informationApi"
import { useGetProfileQuery } from "../api/profileApi"
import { useGetBalanceQuery } from "../api/transactionApi"
import BalanceCard from "../components/BalanceCard"
import CarouselCard from "../components/CarouselCard"
import { ServiceMenu } from "../components/ServiceCard"
import Toast from "../components/AuthToast"
import ServiceCardSkeleton from "../components/skeleton/ServiceCardSkeleton"
import CarouselCardSkeleton from "../components/skeleton/CarouselCardSkeleton"
import MiniProfileSkeleton from "../components/skeleton/MiniProfileSkeleton"
import ProfileSection from "../components/ProfileSection"
import getServerErrorWithStatus from "../utils/errorCast"
import { useDispatch } from "react-redux"
import { authAction } from "../stores/authState"


const HomePage = () => {
    const { data: balanceData, isError: balanceIsErr, error: balanceErr } = useGetBalanceQuery()
    const { data: profileData, isLoading: profileLoading, isError: profileIsErr, error: profileErr } = useGetProfileQuery()
    const { data: bannerData, isError: isBannerErr, error: bannerErr, isLoading: bannerLoading } = useGetBannerQuery()
    const { data: servicesData, isError: isServErr, error: servErr, isLoading: servLoading } = useGetServiceQuery()
    const dispatch = useDispatch()

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        const bannerServerError = getServerErrorWithStatus(bannerErr);
        const profileServerError = getServerErrorWithStatus(profileErr);
        const balanceServerError = getServerErrorWithStatus(balanceErr);
        const servServerError = getServerErrorWithStatus(servErr);
        if (profileServerError?.status === 108 || balanceServerError?.status === 108) {
            setToast({ message: profileServerError?.message || balanceServerError?.message || "Sesi habis.", type: "error" });
            setTimeout(() => {
                dispatch(authAction.logout())
            }, 2000);
            return;
        }

        if (isBannerErr) {
            setToast({
                message: bannerServerError?.message || "Gagal memuat Banner.",
                type: "error",
            });
        } else if (profileIsErr) {
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
    }, [isServErr, isBannerErr, profileIsErr, balanceIsErr, bannerErr, profileErr, balanceErr, servErr, dispatch]);

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
                    {servLoading ? <ServiceCardSkeleton /> : <ServiceMenu
                        services={servicesData?.data || []}
                    />}
                </div>
                <div className="col-span-12 w-full">
                    {bannerLoading ? <CarouselCardSkeleton /> : <CarouselCard banners={bannerData?.data || []} />}
                </div>
            </div>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </>
    )
}

export default HomePage
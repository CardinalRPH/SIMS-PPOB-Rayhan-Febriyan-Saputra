import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../api/profileApi"
import { useGetBalanceQuery, useGetHistoryQuery } from "../api/transactionApi"
import BalanceCard from "../components/BalanceCard"
import type { RecordType } from "../dto/transaction.dto";
import Toast from "../components/AuthToast";
import TransactionList from "../components/TransactionList";
import MiniProfileSkeleton from "../components/skeleton/MiniProfileSkeleton";
import ProfileSection from "../components/ProfileSection";



const TransactionPage = () => {
    const [transactions, setTransactions] = useState<RecordType[]>([]);
    const LIMIT = 4;
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const { data: historyData, isLoading, isFetching, isError: historyIsError, error: historyErr } = useGetHistoryQuery({ limit: LIMIT, offset })
    const { data: balanceData, isError: balanceIsErr, error: balanceErr } = useGetBalanceQuery()
    const { data: profileData, isLoading: profileLoading, isError: profileIsErr, error: profileErr } = useGetProfileQuery()

    useEffect(() => {
        if (historyData?.data?.records) {
            const newRecords = historyData.data.records;

            setTransactions((prev) => {
                const existingInvoices = new Set(prev.map((t) => t.invoice_number));
                const filteredNew = newRecords.filter((t) => !existingInvoices.has(t.invoice_number));
                return [...prev, ...filteredNew];
            });

            if (newRecords.length < LIMIT) {
                setHasMore(false);
            }
        }
    }, [historyData]);

    useEffect(() => {
        if (historyErr && historyIsError) {
            setToast({
                message: (historyErr as any)?.data?.message || "Gagal memuat riwayat transaksi.",
                type: "error",
            });
        }
        if (profileIsErr && profileErr) {
            setToast({
                message: (profileErr as any)?.data?.message || "Gagal memuat data profil pengguna.",
                type: "error",
            });
        } else if (balanceIsErr && balanceErr) {
            setToast({
                message: (balanceErr as any)?.data?.message || "Gagal memuat saldo akun Anda.",
                type: "error",
            });
        }
    }, [historyErr, historyIsError, profileIsErr, profileErr, balanceIsErr, balanceErr]);

    const handleShowMore = () => {
        if (!isFetching && hasMore) {
            setOffset((prev) => prev + LIMIT);
        }
    };

    useEffect(() => {
        document.title = "Transaction | SIMS PPOB-Rayhan Febriyan Saputra";
    }, []);

    return (
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
                <div className="w-full mt-10">
                    <h3 className="text-base font-bold text-gray-800 mb-6">Semua Transaksi</h3>

                    <div className="space-y-4">
                        {transactions.map((tx) => {
                            return (
                                <TransactionList key={tx.invoice_number} data={tx} />
                            );
                        })}
                    </div>

                    {isLoading && transactions.length === 0 && (
                        <div className="space-y-4 mt-4">
                            {[...Array(LIMIT)].map((_, i) => (
                                <div key={i} className="w-full h-20 bg-gray-50 border border-gray-100 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    )}

                    {!isLoading && transactions.length === 0 && (
                        <div className="text-center py-12 text-sm text-gray-400 font-light">
                            Belum ada riwayat transaksi.
                        </div>
                    )}

                    {hasMore && transactions.length > 0 && (
                        <div className="text-center mt-8">
                            <button
                                type="button"
                                onClick={handleShowMore}
                                disabled={isFetching}
                                className="text-sm font-bold text-[#f02c1c] hover:underline cursor-pointer outline-none transition-all disabled:opacity-50"
                            >
                                {isFetching ? "Loading..." : "Show more"}
                            </button>
                        </div>
                    )}

                    {toast && (
                        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionPage
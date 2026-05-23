import type { RecordType } from "../dto/transaction.dto";
import formatCurrency from "../utils/formaCurrency";

const formatAmount = (amount: number, type: string) => {
    const formatted = formatCurrency(amount)
    return type === "TOPUP" ? `+${formatted}` : `-${formatted}`;
};

const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} WIB`;
};

const TransactionList = ({ data }: { data: RecordType }) => {
    const isTopUp = data.transaction_type === "TOPUP";
    return (
        <div
            className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm"
        >
            <div className="space-y-1">
                <div className={`text-lg font-bold ${isTopUp ? "text-[#16a34a]" : "text-[#f02c1c]"}`}>
                    {formatAmount(data.total_amount, data.transaction_type)}
                </div>
                <div className="text-[10px] text-gray-400 font-light">
                    {formatDate(data.created_on)}
                </div>
            </div>

            <div className="text-xs text-gray-700 font-medium">
                {data.service_name}
            </div>
        </div>
    )
}

export default TransactionList
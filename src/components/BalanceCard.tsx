import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import formatCurrency from "../utils/formaCurrency";
import saldoBg from "../assets/images/saldo_bg.png"


const BalanceCard = ({ balance }: { balance: number; }) => {
    const [showBalance, setShowBalance] = useState(false);

    return (
        <div
            className="w-full bg-[#f02c1c] text-white p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between h-35 md:h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${saldoBg})` }}
        >
            <div className="z-10">
                <p className="text-xs md:text-sm text-red-100 mb-1">Saldo anda</p>
                <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                    {showBalance ? formatCurrency(balance) : "Rp •••••••"}
                </h3>
            </div>

            <button
                onClick={() => setShowBalance(!showBalance)}
                className="z-10 flex items-center gap-2 text-[11px] md:text-xs text-red-100 hover:text-white transition-colors outline-none w-fit cursor-pointer"
            >
                <span>Lihat Saldo</span>
                {showBalance ? <BsEyeSlash /> : <BsEye />}
            </button>
        </div>
    );
};

export default BalanceCard
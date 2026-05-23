import logo from "../assets/images/logo.png";
import formatCurrency from "../utils/formaCurrency";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmationModalType = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    amount: number;
    isLoading?: boolean;
    customOkText?: string;
};

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    amount,
    isLoading = false,
    customOkText
}: ConfirmationModalType) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
                        onClick={isLoading ? undefined : onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{
                            type: "spring",
                            duration: 0.4,
                            bounce: 0.3
                        }}
                        className="relative bg-white rounded-xl p-8 w-full max-w-90 mx-4 flex flex-col items-center text-center shadow-lg z-10"
                    >
                        <div className="w-16 h-16 bg-[#f02c1c] rounded-full flex items-center justify-center mb-5 shadow-sm p-3 overflow-hidden">
                            <img
                                src={logo}
                                alt="Logo Dompet"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="space-y-1 mb-8">
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                {title}
                            </p>
                            <h3 className="text-xl font-extrabold text-gray-900 tracking-wide">
                                {formatCurrency(amount)} ?
                            </h3>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="w-full text-sm font-bold text-[#f02c1c] hover:text-[#d62214] active:scale-[0.98] transition-all cursor-pointer outline-none disabled:opacity-50"
                            >
                                {isLoading ? "Memproses..." : customOkText || "Ya, lanjutkan Bayar"}
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="w-full text-sm font-bold text-gray-400 hover:text-gray-500 active:scale-[0.98] transition-all cursor-pointer outline-none disabled:opacity-50"
                            >
                                Batalkan
                            </button>
                        </div>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
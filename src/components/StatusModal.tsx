import { Link } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import formatCurrency from "../utils/formaCurrency";

type StatusModalType = {
    isOpen: boolean;
    onClose: () => void;
    status: "success" | "error";
    title: string;
    amount: number;
    errorMessage?: string;
}

export const StatusModal = ({
    isOpen,
    onClose,
    status,
    title,
    amount,
    errorMessage,
}: StatusModalType) => {
    const isSuccess = status === "success";

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
                        onClick={onClose}
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
                        <div className="mb-5 flex items-center justify-center">
                            {isSuccess ? (
                                <IoCheckmarkCircle className="text-6xl text-[#42bb8e]" />
                            ) : (
                                <IoCloseCircle className="text-6xl text-[#f02c1c]" />
                            )}
                        </div>
                        <div className="space-y-1 mb-8">
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                {title}
                            </p>
                            <h3 className="text-xl font-extrabold text-gray-900 tracking-wide">
                                {formatCurrency(amount)}
                            </h3>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                {isSuccess ? "berhasil!" : errorMessage || "gagal!"}
                            </p>
                        </div>
                        <div className="w-full">
                            <Link
                                to="/"
                                onClick={onClose}
                                className="block w-full text-sm font-bold text-[#f02c1c] hover:text-[#d62214] transition-all"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StatusModal;
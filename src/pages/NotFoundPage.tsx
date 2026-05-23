import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"

const NotFoundPage = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                className="max-w-md flex flex-col items-center"
            >
                <div className="w-16 h-16 bg-[#f02c1c] rounded-full flex items-center justify-center p-2.5 shadow-md mb-6 overflow-hidden">
                    <img
                        src={logo}
                        alt="Logo SIMS PPOB"
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className="text-7xl font-black text-gray-900 tracking-tight mb-2 selection:bg-red-100">
                    404
                </h1>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 max-w-sm">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke alamat lain.
                </p>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                >
                    <Link
                        to="/"
                        className="inline-block w-full py-3 bg-[#f02c1c] hover:bg-[#d62214] text-white rounded-md text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
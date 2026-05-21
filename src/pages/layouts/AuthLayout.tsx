import { Outlet } from "react-router-dom";
import authImg from "../../assets/images/illustrasi_login.png"
import logoImg from "../../assets/images/logo.png"
import ToastAuth from "../../components/AuthToast";
import { useState } from "react";

const AuthLayout = () => {
    const [toastErr, setToastErr] = useState<{ message: string, type: 'success' | 'error'; } | null>(null);
    return (
        <>
            <div className="min-h-screen flex w-full bg-white">
                <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-8 sm:px-24 py-12">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <img src={logoImg} className="w-6 h06" />
                            <h1 className="text-lg font-bold text-gray-800 tracking-wide">SIMS PPOB</h1>
                        </div>

                        {/* left component here */}
                        <Outlet context={{ setToastErr }} />
                        {/* end of left component */}

                    </div>
                </div>

                {/* Right Column Banner */}
                <div className="hidden lg:flex lg:w-[55%] bg-[#fff0f0] items-center justify-center">
                    <img src={authImg} alt="Illustration" className="w-full max-w-max" />
                </div>
            </div>
            {toastErr && (
                <ToastAuth
                    type={toastErr.type}
                    message={toastErr.message}
                    onClose={() => setToastErr(null)}
                />
            )}
        </>
    );
};

export default AuthLayout
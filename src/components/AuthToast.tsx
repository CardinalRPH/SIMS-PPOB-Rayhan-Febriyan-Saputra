import { useEffect } from 'react';
import { BsCheckCircleFill, BsX, BsXCircleFill } from 'react-icons/bs';

type ToastType = {
    message: string;
    onClose: () => void;
    duration?: number;
    type: 'success' | 'error';
}

const Toast = ({ message, onClose, duration = 4000, type }: ToastType) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const styles = {
        error: {
            wrapper: 'bg-[#fff0f0] border-[#ffe0e0] text-[#f02c1c]',
            icon: <BsXCircleFill className="text-[#f02c1c] text-base" />
        },
        success: {
            wrapper: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#16a34a]',
            icon: <BsCheckCircleFill className="text-[#16a34a] text-base" />
        }
    };

    const currentStyle = styles[type];

    return (
        <div className={`fixed bottom-6 left-6 z-50 w-full max-w-md border rounded-md px-4 py-3 flex items-center justify-between shadow-lg animate-slide-up ${currentStyle.wrapper}`}>

            <div className="flex items-center gap-3 pr-4 flex-1">
                {currentStyle.icon}
                <span className="text-sm font-medium leading-normal">
                    {message}
                </span>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="hover:opacity-70 text-xl p-1 outline-none transition-opacity cursor-pointer shrink-0 flex items-center justify-center"
            >
                <BsX />
            </button>
        </div>
    );
};

export default Toast
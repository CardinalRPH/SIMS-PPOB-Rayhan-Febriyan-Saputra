import type React from "react";

interface RedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const RedButton: React.FC<RedButtonProps> = ({ children, disabled, ...props }) => {
    return (
        <button
            disabled={disabled}
            {...props}
            className={`w-full ${disabled ? "bg-[#C6C0C0] hover:bg-[#d6d1d1]" : " bg-[#f02c1c] hover:bg-[#d62214]"} text-white font-medium py-2.5 px-4 rounded text-sm transition-colors focus:outline-none`}
        >
            {children}
        </button>
    );

}

export default RedButton
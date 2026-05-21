import type React from "react";

interface RedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const RedButton: React.FC<RedButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="w-full bg-[#f02c1c] hover:bg-[#d62214] text-white font-medium py-2.5 px-4 rounded text-sm transition-colors focus:outline-none"
        >
            {children}
        </button>
    );

}

export default RedButton